/**
 * @jest-environment node
 */
import { POST, DELETE } from "../route";
import { NextRequest } from "next/server";
import { mock, reset, when } from "ts-mockito";
import prisma from "@/app/libs/prismadb";

const mockedRequest: NextRequest = mock(NextRequest);

jest.mock("../../../../actions/getCurrentUser", () => {
	return {
		getCurrentUser: async (): Promise<UiUser | null | undefined> => {
			const currentUser = await prisma.user.findUnique({ where: { email: process.env.TEST_USER_EMAIL } });
			if (!currentUser) return null;
			return {
				...currentUser,
				emailVerified: currentUser.emailVerified?.toISOString() || "",
				createdAt: currentUser.createdAt.toISOString() || "",
				updatedAt: currentUser.updatedAt.toISOString() || "",
			};
		},
	};
});

afterEach(() => {
	reset(mockedRequest);
});

describe("Favorite POST", () => {
	it("should add the listing to the current user's favoritedIds", async () => {
		let currentUser = await prisma.user.findUnique({ where: { email: process.env.TEST_USER_EMAIL } });
		const listing = await prisma.listing.findFirst({ where: { userId: currentUser?.id } });
		if (listing) {
			const listingId = listing.id;
			const returnFromJson = () => {
				return new Promise<any>((resolve, reject) => {
					resolve({ listingId });
				});
			};
			when(mockedRequest.json()).thenCall(returnFromJson);
			await POST(mockedRequest, { params: { listingId } });
			currentUser = await prisma.user.findUnique({ where: { email: process.env.TEST_USER_EMAIL } });
			console.log({ currentUser });
			expect(currentUser?.favoriteIds.includes(listingId)).toBe(true);
		} else {
			expect(false, "either the test user or the test listing as not seeded to the database").toBe(true);
		}
	});
});

describe("Favorite DELETE", () => {
	it("should remove the listing from the current user's favoritedIds", async () => {
		let currentUser = await prisma.user.findUnique({ where: { email: process.env.TEST_USER_EMAIL } });
		const listing = await prisma.listing.findFirst({ where: { userId: currentUser?.id } });
		if (listing) {
			const listingId = listing.id;
			const returnFromJson = () => {
				return new Promise<any>((resolve, reject) => {
					resolve({ listingId });
				});
			};
			when(mockedRequest.json()).thenCall(returnFromJson);
			await DELETE(mockedRequest, { params: { listingId } });
			currentUser = await prisma.user.findUnique({ where: { email: process.env.TEST_USER_EMAIL } });
			console.log({ currentUser });
			expect(currentUser?.favoriteIds.includes(listingId)).toBe(false);
		} else {
			expect(false, "either the test user or the test listing as not seeded to the database").toBe(true);
		}
	});
});

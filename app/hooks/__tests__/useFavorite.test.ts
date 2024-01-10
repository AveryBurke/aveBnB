import { renderHook } from "@testing-library/react";
import { useFavorite } from "../useFavorite";
import { useRouter } from "next/navigation";
import prisma from "@/app/libs/prismadb";
import useLoginModal from "../useLoginModal";

afterEach(() => {
	jest.restoreAllMocks();
});

const refreshMock = jest.fn();
const onOpenMock = jest.fn();
jest.mock("next/navigation");

//@ts-ignore
useRouter.mockReturnValue({
	refresh: refreshMock,
});

jest.mock("../useLoginModal");

//@ts-ignore
useLoginModal.mockReturnValue({
	onOpen: onOpenMock,
});

describe("useFavorite", () => {
	it("should make a post request for the listing, if the listing is not in the user's favoritedIds", async () => {
		const fetchMock = jest
			.spyOn(global, "fetch")
			.mockImplementation(jest.fn(() => Promise.resolve({ json: () => Promise.resolve({ data: 100 }) })) as jest.Mock);
		let testUser = await prisma.user.findUnique({ where: { email: process.env.TEST_USER_EMAIL } });
		const testListing = await prisma.listing.findFirst({ where: { userId: testUser?.id } });
		if (testUser && testListing) {
			const listingId = testListing.id;
			const currentUser: UiUser = {
				...testUser,
				favoriteIds: [],
				emailVerified: testUser.emailVerified?.toISOString() || "",
				createdAt: testUser.createdAt.toISOString() || "",
				updatedAt: testUser.updatedAt.toISOString() || "",
			};
			const { result } = renderHook(useFavorite, { initialProps: { listingId, currentUser } });
			expect(result.current.hasFavorited).toBe(false);
			const stopPropagationMock = jest.fn();
			await result.current.toggleFavorited({ stopPropagation: stopPropagationMock } as unknown as React.MouseEvent<HTMLDivElement>);
			expect(stopPropagationMock).toHaveBeenCalled();
			expect(fetchMock).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_BASE_URL}/api/favorites/${listingId}`, {
				body: null,
				headers: { "Content-Type": "application/json" },
				method: "POST",
			});
		} else {
			expect(false, "the test user or the test listing where not seeded to the database").toBe(true);
		}
	});

	it("should make a delete request for the listing, if the listing is in the user's favoritedId's", async () => {
		let testUser = await prisma.user.findUnique({ where: { email: process.env.TEST_USER_EMAIL } });
		const fetchMock = jest
			.spyOn(global, "fetch")
			.mockImplementation(jest.fn(() => Promise.resolve({ json: () => Promise.resolve({ data: 100 }) })) as jest.Mock);
		const testListing = await prisma.listing.findFirst({ where: { userId: testUser?.id } });
		if (testUser && testListing) {
			const listingId = testListing.id;
			const currentUser: UiUser = {
				...testUser,
				favoriteIds: [listingId],
				emailVerified: testUser.emailVerified?.toISOString() || "",
				createdAt: testUser.createdAt.toISOString() || "",
				updatedAt: testUser.updatedAt.toISOString() || "",
			};

			const { result } = renderHook(useFavorite, { initialProps: { listingId, currentUser } });
			expect(result.current.hasFavorited).toBe(true);
			const stopPropagationMock = jest.fn();
			await result.current.toggleFavorited({ stopPropagation: stopPropagationMock } as unknown as React.MouseEvent<HTMLDivElement>);
			expect(stopPropagationMock).toHaveBeenCalled();
			expect(fetchMock).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_BASE_URL}/api/favorites/${listingId}`, {
				body: null,
				headers: { "Content-Type": "application/json" },
				method: "DELETE",
			});
		} else {
			expect(false, "the test user or the test listing where not seeded to the database").toBe(true);
		}
	});

	it("should open the login modal if there there is no current user", async () => {
		let testUser = await prisma.user.findUnique({ where: { email: process.env.TEST_USER_EMAIL } });
		const testListing = await prisma.listing.findFirst({ where: { userId: testUser?.id } });
		if (testListing) {
			const listingId = testListing.id;
			const { result } = renderHook(useFavorite, { initialProps: { listingId } });
			const stopPropagationMock = jest.fn();
			await result.current.toggleFavorited({ stopPropagation: stopPropagationMock } as unknown as React.MouseEvent<HTMLDivElement>);
			expect(stopPropagationMock).toHaveBeenCalled();
			expect(onOpenMock).toHaveBeenCalled();
		} else {
			expect(false, "the test user or the test listing where not seeded to the database").toBe(true);
		}
	});
});

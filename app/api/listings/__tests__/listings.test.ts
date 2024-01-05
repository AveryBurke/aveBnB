/**
 * @jest-environment node
 */
import { POST } from "../route";
import { NextRequest } from "next/server";
import { instance, mock, reset, when } from "ts-mockito";
import prisma from "@/app/libs/prismadb";

const mockedRequest: NextRequest = mock(NextRequest);

jest.mock("../../../actions/getCurrentUser", () => {
	return {
		//get the test user from seeded into the test db
		getCurrentUser: async () => await prisma.user.findUnique({ where: { email: "test@user.com" } }),
	};
});

afterEach(() => {
	reset(mockedRequest);
});

afterAll(() => {
	prisma.listing.deleteMany({ where: { title: "Test Posting" } });
});

describe("Register Post", () => {
	describe("Behavior", () => {
		it("should create a new listing", async () => {
			const newPosting = {
				title: "Test Posting",
				description: "This is a test Posting",
				imageSrc: "",
				category: "Haunted",
				roomCount: 1,
				bathroomCount: 1,
				guestCount: 1,
				locationValue: { value: "AB" },
				price: "1.10",
			};
			function returnFromJson() {
				return new Promise<any>((resolve, reject) => {
					resolve(newPosting);
				});
			}
			when(mockedRequest.json()).thenCall(returnFromJson);
			const resp = await POST(instance(mockedRequest));
			const listing = await prisma.listing.findFirst({ where: { title: "Test Posting" } });
			expect(resp.status).toBe(200);
			expect(listing?.title).toEqual("Test Posting");
		});
	});
});

/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { DELETE } from "../route";
import { mock, reset, instance } from "ts-mockito";
import prisma from "@/app/libs/prismadb";
import { addWeeks } from "date-fns";

const mockedRequest: NextRequest = mock(NextRequest);

afterEach(() => {
	reset(mockedRequest);
});

describe("listings DELETE", () => {
	it("should remove a listing from the database", async () => {
		let currentUser = await prisma.user.findUnique({ where: { email: process.env.TEST_USER_EMAIL } });
		// const prevListings = await prisma.listing.findMany({ where: { userId: currentUser?.id } });
		if (currentUser) {
			const newListing = await prisma.listing.create({
				data: {
					userId: currentUser.id,
					title: "listing to be deleted",
					description: "this listing should be removed by the DELETE request",
					imageSrc: "",
					category: "",
					roomCount: 0,
					bathroomCount: 0,
					guestCount: 0,
					locationValue: "",
					price: 0,
				},
			});
            // make sure the new listing is in the database, before proceeding
			const listingBeforeDelete = await prisma.listing.findMany({ where: { id: newListing.id, userId: currentUser.id } });
            expect(listingBeforeDelete.length).toEqual(1);
			await DELETE(instance(mockedRequest), { params: { listingId:newListing.id } });
			const listingsAfterDelete = await prisma.listing.findMany({ where: { id: newListing.id, userId: currentUser.id } });
            expect(listingsAfterDelete.length).toEqual(0);
			// expect(newlistings.find((reservation) => reservation.id === reservationId)).toBe(undefined);
		} else {
			expect(false, "either the test user or the test listing as not seeded to the database").toBe(true);
		}
	});
});

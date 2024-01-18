/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { DELETE } from "../route";
import { mock, reset, instance } from "ts-mockito";
import prisma from "@/app/libs/prismadb";
import { addWeeks } from "date-fns";


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

describe("Reservations DELETE", () => {
	it("should remove a reservation from the listing's reservations", async () => {
		let currentUser = await prisma.user.findUnique({ where: { email: process.env.TEST_USER_EMAIL } });
		const listing = await prisma.listing.findFirst({ where: { userId: currentUser?.id } });
		const startDate = new Date();
		const endDate = addWeeks(startDate, 1);
		const totalPrice = 1000.2;
		if (listing && currentUser) {
			const listingId = listing.id;
			// create a new reservation, to be deleted by the test
			await prisma.listing.update({
				where: { id: listingId },
				data: {
					reservations: {
						create: {
							userId: currentUser.id,
							startDate,
							endDate,
							totalPrice,
						},
					},
				},
			});
			const reservations = await prisma.reservation.findMany({ where: { listingId: listing?.id }, orderBy: { createdAt: "desc" } });
			expect(reservations.length).toEqual(2); // make sure the reservation was created
			const reservationId = reservations[0].id; // get the id of the new reservation
			await DELETE(instance(mockedRequest), { params: { reservationId } });
			const newReservations = await prisma.reservation.findMany({ where: { listingId: listing?.id }, orderBy: { createdAt: "desc" } });
			expect(newReservations.find((reservation) => reservation.id === reservationId)).toBe(undefined);
		} else {
			expect(false, "either the test user or the test listing as not seeded to the database").toBe(true);
		}
	});
});

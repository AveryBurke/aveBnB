/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { POST } from "../route";
import { mock, reset, when, instance } from "ts-mockito";
import prisma from "@/app/libs/prismadb";
import { addWeeks } from "date-fns";

const mockedRequest: NextRequest = mock(NextRequest);

afterEach(() => {
	reset(mockedRequest);
});

afterAll(async () => {
	//remove the newly added test reservation
	let currentUser = await prisma.user.findUnique({ where: { email: process.env.TEST_USER_EMAIL } });
	const listing = await prisma.listing.findFirst({ where: { userId: currentUser?.id } });
	const reservations = await prisma.reservation.findMany({ where: { listingId: listing?.id }, orderBy: { createdAt: "desc" } });
	await prisma.reservation.delete({ where: { id: reservations[0].id } });
});

describe("Reservations POST", () => {
	it("should add reservations to the listing's reservations", async () => {
		let currentUser = await prisma.user.findUnique({ where: { email: process.env.TEST_USER_EMAIL } });
		const listing = await prisma.listing.findFirst({ where: { userId: currentUser?.id } });
		const startDate = new Date();
		const endDate = addWeeks(startDate, 1);
		const totalPrice = 1000.2;
		if (listing) {
			const listingId = listing.id;
			const returnFromJson = () => new Promise<any>((resolve, reject) => resolve({ listingId, startDate, endDate, totalPrice }));

			when(mockedRequest.json()).thenCall(returnFromJson);
			await POST(instance(mockedRequest));
			const reservations = await prisma.reservation.findMany({ where: { listingId }, orderBy: { createdAt: "desc" } });
			expect(reservations.length).toEqual(2);
		} else {
			expect(false, "either the test user or the test listing as not seeded to the database").toBe(true);
		}
	});
});

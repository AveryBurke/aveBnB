import getReservations from "../getReservations";
import prisma from "@/app/libs/prismadb";

describe("getReservations", () => {
	it("should get the test reservation by the user id", async () => {
		const testUser = await prisma.user.findUnique({
			where: { email: process.env.TEST_USER_EMAIL },
		});

		if (testUser && testUser.id) {
			const reservation = await getReservations({ tag: 1, value: testUser.id });
			expect(reservation.length).toBe(1);
		} else {
			expect(false, "the test user was not seeded to the database").toBe(true);
		}
	});

	it("should get the test reservation by the listing id", async () => {
		const testUser = await prisma.user.findUnique({
			where: { email: process.env.TEST_USER_EMAIL },
		});
		const testListing = await prisma.listing.findFirst({
			where: { userId: testUser?.id },
		});
		if (testListing && testListing.id) {
			const reservation = await getReservations({ tag: 0, value: testListing.id });
			expect(reservation.length).toBe(1);
		} else {
			expect(false, "the test user or the test listing was not seeded to the database").toBe(true);
		}
	});

    it("should get the test reservation by the listing's user id", async () => {
		const testUser = await prisma.user.findUnique({
			where: { email: process.env.TEST_USER_EMAIL },
		});

		if (testUser && testUser.id) {
			const reservation = await getReservations({ tag: 2, value: testUser.id });
			expect(reservation.length).toBe(1);
		} else {
			expect(false, "the test user was not seeded to the database").toBe(true);
		}
	});

    // it("should get the reservations by the listing's user id", async () => {
	// 	const testUser = await prisma.user.findUnique({
	// 		where: { email: process.env.TEST_USER_EMAIL },
	// 	});

	// 	if (testUser && testUser.id) {
	// 		const reservation = await getReservations({ tag: 2, value: testUser.id });
	// 		expect(reservation.length).toBe(1);
	// 	} else {
	// 		expect(false, "the test user was not seeded to the database").toBe(true);
	// 	}
	// });
});

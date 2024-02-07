import prisma from "../app/libs/prismadb";
import { hash } from "bcrypt";
import { addWeeks } from "date-fns";

(async function () {
	prisma.user.deleteMany({});
	prisma.listing.deleteMany({});
	const hashPassword = await hash(process.env.TEST_USER_PASSWORD || "", 12);
	const testUser = await prisma.user.create({
		data: {
			name: process.env.TEST_USER_NAME || "",
			email: process.env.TEST_USER_EMAIL || "",
			hashPassword,
		},
	});
	const testUser2 = await prisma.user.create({
		data: {
			name: process.env.TEST_USER_2_NAME || "",
			email: process.env.TEST_USER_2_EMAIL || "",
			hashPassword,
		},
	});
	console.log({ testUser, testUser2 });
	const testListing = await prisma.listing.create({
		data: {
			userId: testUser.id,
			description: process.env.TEST_LISTING_DESCRIPTION || "",
			price: 100,
			locationValue: process.env.TEST_LISTING_LOCATION_VALUE || "",
			title: process.env.TEST_LISTING_TITLE || "",
			imageSrc: "",
			category: process.env.TEST_CATEGORY || "",
			roomCount: process.env.TEST_LISTING_ROOM_COUNT ? +process.env.TEST_LISTING_ROOM_COUNT : 0,
			bathroomCount: process.env.TEST_LISTING_BATHROOM_COUNT ? +process.env.TEST_LISTING_BATHROOM_COUNT : 0,
			guestCount: process.env.TEST_LISTING_GUEST_COUNT ? +process.env.TEST_LISTING_GUEST_COUNT : 0,
		},
	});
	console.log({ testListing });
	const startDate = new Date();
	const testReservation = await prisma.listing.update({
		where: { id: testListing.id },
		data: {
			reservations: {
				create: {
					startDate,
					endDate: addWeeks(startDate, 1),
					totalPrice: 100.1,
					userId: testUser.id,
				},
			},
		},
	});
	console.log({ testReservation });
})();

import prisma from "../app/libs/prismadb";
import { hash } from "bcrypt";

/* && dotenv -e .env.test prisma db seed */
(async function () {
	prisma.user.deleteMany({});
	prisma.listing.deleteMany({});
	const hashPassword = await hash(process.env.TEST_USER_PASSWORD || "testpassword", 12);
	const testUser = await prisma.user.create({
		data: {
			name: process.env.TEST_USER_NAME || "Test User",
			email: process.env.TEST_USER_EMAIL || "test@user.com",
			hashPassword,
		},
	});
	console.log({ testUser });
	const testListing = await prisma.listing.create({
		data: {
			userId: testUser.id,
			description: "test listing description",
			price: 100,
			locationValue: "AB",
			title: "test listing",
			imageSrc: "",
			category: "test category",
			roomCount: 3,
			bathroomCount: 3,
			guestCount: 3,
		},
	});
	console.log({ testListing });
})();

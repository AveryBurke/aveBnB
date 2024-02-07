import getListings from "../getListings";
import prisma from "@/app/libs/prismadb";
import { addDays, addMonths, addWeeks } from "date-fns";

describe("getLIstings", () => {
	describe("filter by reservation ", () => {
		it("should filter out the test listing, by reservation time", async () => {
			// the seeded reservation has a start date of new Date() and an end date of start date + 1 week
			const startDate = addDays(new Date(), 1);
			const endDate = addDays(startDate, 3);

			const lsitings = await getListings({ startDate: startDate.toISOString(), endDate: endDate.toISOString() });
			expect(lsitings.length).toEqual(0);
		});

		it("Should return the test listing becuase there are no existing reservations", async () => {
			const startDate = addMonths(new Date(), 1);
			const endDate = addWeeks(startDate, 1);

			const lsitings = await getListings({ startDate: startDate.toISOString(), endDate: endDate.toISOString() });
			expect(lsitings.length).not.toEqual(0);
		});

		it("Should filter out the test listing, by date range, even though the rest of the params match", async () => {
			const startDate = addDays(new Date(), 1);
			const endDate = addDays(startDate, 3);
			const user = await prisma.user.findUnique({ where: { email: process.env.TEST_USER_EMAIL } });
			const lsitings = await getListings({
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString(),
				bathroomCount: process.env.TEST_LISTING_BATHROOM_COUNT ? +process.env.TEST_LISTING_BATHROOM_COUNT : 0,
				guestCount: process.env.TEST_LISTING_GUEST_COUNT ? +process.env.TEST_LISTING_GUEST_COUNT : 0,
				roomCount: process.env.TEST_LISTING_ROOM_COUNT ? +process.env.TEST_LISTING_ROOM_COUNT : 0,
				locationValue: process.env.TEST_LISTING_LOCATION_VALUE || "",
				category: process.env.TEST_CATEGORY || "",
				userId: user?.id,
			});
			expect(lsitings.length).toEqual(0);
		});
	});

	describe("filter by location", () => {
		it("should filter out the test listing, by location", async () => {
			const lsitings = await getListings({ locationValue: "ZZ" });
			expect(lsitings.length).toEqual(0);
		});

		it("Should return the test listing by location", async () => {
			const lsitings = await getListings({ locationValue: process.env.TEST_LISTING_LOCATION_VALUE || "" });
			expect(lsitings.length).not.toEqual(0);
		});

		it("should filter out by location, even though the rest of the params match", async () => {
			const user = await prisma.user.findUnique({ where: { email: process.env.TEST_USER_EMAIL } });
			const lsitings = await getListings({
				locationValue: "ZZ",
				bathroomCount: process.env.TEST_LISTING_BATHROOM_COUNT ? +process.env.TEST_LISTING_BATHROOM_COUNT : 0,
				guestCount: process.env.TEST_LISTING_GUEST_COUNT ? +process.env.TEST_LISTING_GUEST_COUNT : 0,
				roomCount: process.env.TEST_LISTING_ROOM_COUNT ? +process.env.TEST_LISTING_ROOM_COUNT : 0,
				category: process.env.TEST_CATEGORY || "",
				userId: user?.id,
			});
			expect(lsitings.length).toEqual(0);
		});
	});

	describe("filter by category", () => {
		it("should filter out the test listing, by category", async () => {
			const lsitings = await getListings({ category: "wrong category" });
			expect(lsitings.length).toEqual(0);
		});

		it("Should return the test listing by categry", async () => {
			const lsitings = await getListings({ category: process.env.TEST_CATEGORY || "" });
			expect(lsitings.length).not.toEqual(0);
		});

		it("should filter out by category, even though the rest of the params match", async () => {
			const user = await prisma.user.findUnique({ where: { email: process.env.TEST_USER_EMAIL } });
			const lsitings = await getListings({
				locationValue: process.env.TEST_LISTING_LOCATION_VALUE || "",
				bathroomCount: process.env.TEST_LISTING_BATHROOM_COUNT ? +process.env.TEST_LISTING_BATHROOM_COUNT : 0,
				guestCount: process.env.TEST_LISTING_GUEST_COUNT ? +process.env.TEST_LISTING_GUEST_COUNT : 0,
				roomCount: process.env.TEST_LISTING_ROOM_COUNT ? +process.env.TEST_LISTING_ROOM_COUNT : 0,
				category: "wrong category",
				userId: user?.id,
			});
			expect(lsitings.length).toEqual(0);
		});
	});

	describe("filter by room count", () => {
		it("Should return the test listing by room count", async () => {
			const lsitings = await getListings({ roomCount: process.env.TEST_LISTING_ROOM_COUNT ? +process.env.TEST_LISTING_ROOM_COUNT : 0 });
			expect(lsitings.length).not.toEqual(0);
		});

		it("should filter out the test listing, by room count", async () => {
			const lsitings = await getListings({ roomCount: process.env.TEST_LISTING_ROOM_COUNT ? +process.env.TEST_LISTING_ROOM_COUNT + 10 : 0 });
			expect(lsitings.length).toEqual(0);
		});

		it("should filter out by room count, even though the rest of the params match", async () => {
			const user = await prisma.user.findUnique({ where: { email: process.env.TEST_USER_EMAIL } });
			const lsitings = await getListings({
				locationValue: process.env.TEST_LISTING_LOCATION_VALUE || "",
				bathroomCount: process.env.TEST_LISTING_BATHROOM_COUNT ? +process.env.TEST_LISTING_BATHROOM_COUNT : 0,
				guestCount: process.env.TEST_LISTING_GUEST_COUNT ? +process.env.TEST_LISTING_GUEST_COUNT : 0,
				roomCount: process.env.TEST_LISTING_ROOM_COUNT ? +process.env.TEST_LISTING_ROOM_COUNT + 10 : 0,
				category: process.env.TEST_CATEGORY || "",
				userId: user?.id,
			});
			expect(lsitings.length).toEqual(0);
		});
	});

	describe("filter by bathroom count", () => {
		it("Should return the test listing by bathroom count", async () => {
			const lsitings = await getListings({ bathroomCount: process.env.TEST_LISTING_BATHROOM_COUNT ? +process.env.TEST_LISTING_BATHROOM_COUNT : 0 });
			expect(lsitings.length).not.toEqual(0);
		});

		it("should filter out the test listing, by bathroom count", async () => {
			const lsitings = await getListings({ bathroomCount: process.env.TEST_LISTING_BATHROOM_COUNT ? +process.env.TEST_LISTING_BATHROOM_COUNT + 10 : 0 });
			expect(lsitings.length).toEqual(0);
		});

		it("should filter out by bathroom count, even though the rest of the params match", async () => {
			const user = await prisma.user.findUnique({ where: { email: process.env.TEST_USER_EMAIL } });
			const lsitings = await getListings({
				locationValue: process.env.TEST_LISTING_LOCATION_VALUE || "",
				bathroomCount: process.env.TEST_LISTING_BATHROOM_COUNT ? +process.env.TEST_LISTING_BATHROOM_COUNT + 10 : 0,
				guestCount: process.env.TEST_LISTING_GUEST_COUNT ? +process.env.TEST_LISTING_GUEST_COUNT : 0,
				roomCount: process.env.TEST_LISTING_ROOM_COUNT ? +process.env.TEST_LISTING_ROOM_COUNT : 0,
				category: process.env.TEST_CATEGORY || "",
				userId: user?.id,
			});
			expect(lsitings.length).toEqual(0);
		});

		describe("filter by guest count", () => {
			it("Should return the test listing by guest count", async () => {
				const lsitings = await getListings({ guestCount: process.env.TEST_LISTING_GUEST_COUNT ? +process.env.TEST_LISTING_GUEST_COUNT : 0 });
				expect(lsitings.length).not.toEqual(0);
			});

			it("should filter out the test listing, by guest count", async () => {
				const lsitings = await getListings({ guestCount: process.env.TEST_LISTING_GUEST_COUNT ? +process.env.TEST_LISTING_GUEST_COUNT + 10 : 0 });
				expect(lsitings.length).toEqual(0);
			});

			it("should filter out by guest count, even though the rest of the params match", async () => {
				const user = await prisma.user.findUnique({ where: { email: process.env.TEST_USER_EMAIL } });
				const lsitings = await getListings({
					locationValue: process.env.TEST_LISTING_LOCATION_VALUE || "",
					bathroomCount: process.env.TEST_LISTING_BATHROOM_COUNT ? +process.env.TEST_LISTING_BATHROOM_COUNT : 0,
					guestCount: process.env.TEST_LISTING_GUEST_COUNT ? +process.env.TEST_LISTING_GUEST_COUNT + 10 : 0,
					roomCount: process.env.TEST_LISTING_ROOM_COUNT ? +process.env.TEST_LISTING_ROOM_COUNT : 0,
					category: process.env.TEST_CATEGORY || "",
					userId: user?.id,
				});
				expect(lsitings.length).toEqual(0);
			});
		});
	});
});

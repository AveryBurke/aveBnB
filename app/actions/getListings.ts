import prisma from "@/app/libs/prismadb";

export default async function getListings(params: IListingParams): Promise<UiListing[]> {
	try {
		const { userId, roomCount, bathroomCount, guestCount, locationValue, startDate, endDate } = params;
		let query: any = { };
		if (userId) {
			query.userId = userId;
		}
		if (locationValue){
			query.locationValue = locationValue;
		}
		if (roomCount) {
			query.roomCount = {
				gte: +roomCount,
			};
		}
		if (bathroomCount) {
			query.bathroomCount = {
				gte: +bathroomCount,
			};
		}
		if (guestCount) {
			query.guestCount = {
				gte: +guestCount,
			};
		}

		if (startDate && endDate) {
			query.NOT = {
				reservations: {
					some: {
						OR: [
							{ endDate: { gte: startDate }, startDate: { lte: endDate } },
							{ startDate: { lte: endDate }, endDate: { gte: endDate } },
						],
					},
				},
			};
		}
		const listings = await prisma.listing.findMany({
			where: query,
			orderBy: {
				createdAt: "desc",
			},
		});
		const uiListings = listings.map((listing) => ({
			...listing,
			createdAt: listing.createdAt.toString(),
		}));
		return uiListings;
	} catch (error: any) {
		throw new Error(error);
	}
}

import prisma from "@/app/libs/prismadb";

/**
 * get reservations by listingId, userId, or listingUserId
 * @param params a discriminated union of the possible query parameters: listingId, userId, or listingUserId with their respective values
 * @returns an array of reservations with their respective listing
 */
export default async function getReservations(params: IDiscriminatedUnion): Promise<UiReservationWithUiListing[]> {
	try {
		const { tag, value } = params;

		const query: any = {};

		switch (tag) {
			case 0:
				query.listingId = value;
				break;
			case 1:
				query.userId = value;
				break;
			case 3:
				query.listing = { userId: value };
				break;
			default:
				break;
		}
		const reservations = await prisma.reservation.findMany({ where: query, include: { listing: true }, orderBy: { createdAt: "desc" } });
		return reservations.map((res) => ({
			...res,
			listing: {
				...res.listing,
				createdAt: res.listing.createdAt.toISOString(),
			},
			createdAt: res.createdAt.toISOString(),
			startDate: res.startDate.toISOString(),
			endDate: res.endDate.toISOString(),
		}));
	} catch (error) {
		throw error;
	}
}

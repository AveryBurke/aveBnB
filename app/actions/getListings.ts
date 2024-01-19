import prisma from "@/app/libs/prismadb";

export default async function getListings(params: IListingParams): Promise<UiListing[]> {
	try {
		const { userId } = params;
		let query: any = {};
		if (userId) query = { userId };
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

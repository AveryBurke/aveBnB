import prisma from "@/app/libs/prismadb";

export default async function getListings(): Promise<UiListing[]> {
	try {
		const listings = await prisma.listing.findMany({
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

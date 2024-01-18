import { getCurrentUser } from "./getCurrentUser";
import prisma from "@/app/libs/prismadb";

const getFavoriteListings = async (): Promise<UiListing[]> => {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser) return [];

		const listings = await prisma.listing.findMany({ where: { id: { in: currentUser.favoriteIds } } });

		return listings.map((listing) => ({
			...listing,
			createdAt: listing.createdAt.toISOString(),
		}));
	} catch (error) {
		throw new Error(error as string);
	}
};

export default getFavoriteListings;

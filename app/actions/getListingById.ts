import prisma from "@/app/libs/prismadb";

export default async function getListingById(params: IParams): Promise<UiListingWithUiUser | null | undefined> {
	try {
		const { listingId } = params;
        if (typeof listingId !== "string") return null;
		const listing = await prisma.listing.findUnique({ where: { id: listingId }, include: { user: true } });
		if (!listing) return null;
		return {
			...listing,
			createdAt: listing.createdAt.toISOString(),
			user: {
				...listing.user,
				createdAt: listing.user.createdAt.toISOString(),
				updatedAt: listing.user.updatedAt.toDateString(),
				emailVerified: listing.user.emailVerified?.toISOString() || null,
			},
		};
	} catch (error) {}
}

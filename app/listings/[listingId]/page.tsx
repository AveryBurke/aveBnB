import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import ListingClient from "./ListingClient";

export default async function ListingPage({ params }: { params: IParams }) {
	const listing = await getListingById(params);
	const currentUser = await getCurrentUser();
	if (!listing) return <EmptyState />;

	return <ListingClient {...{ currentUser, listing }} />;
}

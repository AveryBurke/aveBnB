import { getCurrentUser } from "@/app/actions/getCurrentUser";
import EmptyState from "@/app/components/EmptyState";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoritesClient from './FavoritesClient'

const page = async () => {
	const currentUser = await getCurrentUser();
	const favorites = await getFavoriteListings();
	if (!currentUser || favorites.length === 0) return <EmptyState title="No favorite places" subtitle="It looks like you haven't selected favorites yet" />;
    return <FavoritesClient {...{currentUser, favorites}}/>;
};

export default page;

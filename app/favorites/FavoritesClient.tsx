import React from "react";
import Container from "../components/container";
import Heading from "../components/modals/Heading";
import ListingCard from "../components/listings/ListingCard";

interface FavoritesClientProps {
	favorites: UiListing[];
	currentUser?: UiUser;
}
const FavoritesClient: React.FC<FavoritesClientProps> = ({ favorites, currentUser }) => {
	return (
		<Container>
			<Heading title="Favorites" subtitle="A list of your favorite places!" />
			<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
				{favorites.map((listing) => (
					<ListingCard key={listing.id} currentUser={currentUser} data={listing} />
				))}
			</div>
		</Container>
	);
};

export default FavoritesClient;

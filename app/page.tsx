import Container from "./components/container";
import EmptyState from "./components/EmptyState";
import getListings from "@/app/actions/getListings";
import ListingCard from "./components/listings/ListingCard";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import React from "react";
interface HomeProps {
	searchParams: IListingParams;
}
const Home: React.FC<HomeProps> = async ({ searchParams }) => {
	console.log("searchParams", searchParams);
	const listings = await getListings(searchParams);
	if (listings.length === 0) return <EmptyState showReset />;
	//NOTE there is some prop drilling regarding the current user. I want to correct this
	//one idea is to get the current user from the hooks that use it
	const currentUser = await getCurrentUser();
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-16">
			<Container>
				<div className=" pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
					{listings.map((listing) => (
						<ListingCard key={listing.id} data={listing} currentUser={currentUser} />
					))}
				</div>
			</Container>
		</main>
	);
};

export default Home;

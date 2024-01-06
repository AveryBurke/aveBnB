import Container from "./components/container";
import EmptyState from "./components/EmptyState";
import getListings from "@/app/actions/getListings";
import ListingCard from "./components/listings/ListingCard";
export default async function Home() {
	const listings = await getListings();
	if (listings.length === 0) return <EmptyState showReset />;
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-16">
			<Container>
				<div className=" pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
					{listings.map((listing) => (
						<ListingCard key = {listing.id} data={listing} />
					))}
				</div>
			</Container>
		</main>
	);
}

"use client";
import React, { useCallback, useState } from "react";
import Container from "../components/container";
import Heading from "../components/modals/Heading";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";
import { id } from "date-fns/locale";

interface TripsClientProps {
	listings: UiListing[];
	currentUser: UiUser;
}

const TripsClient: React.FC<TripsClientProps> = ({ listings, currentUser }) => {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState("");

	const onCancel = useCallback(
		(id: string) => {
			setDeletingId(id);
			fetch(`api/listings/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: null,
			})
				.then(() => {
					toast.success("Listing deleted");
					router.refresh();
				})
				.catch(() => toast.error("something went wrong"))
				.finally(() => setDeletingId(""));
		},
		[router]
	);

	const onListingClick = useCallback((id: string) => {
		router.push(`/listings/edit/${id}`);
	}, [router])

	return (
		<Container>
			<Heading title="List of your properties" />
			<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
				{listings.map((listing) => (
					<ListingCard
						key={listing.id}
						data={listing}
						actionId={listing.id}
						onAction={onCancel}
						onClick={onListingClick}
						disabled={deletingId === listing.id}
						actionLabel="Remove Property"
						currentUser={currentUser}
						showHeart={false}
					/>
				))}
			</div>
		</Container>
	);
};

export default TripsClient;

"use client";
import React, { useMemo } from "react";
import { categories } from "@/app/components/navbar/Categories";
import { Reservation } from "@prisma/client";
import Container from "@/app/components/container";
import ListingHead from "@/app/components/listings/ListingHead";

interface ListingClientProps {
	reservations?: Reservation[];
	listing: UiListingWithUiUser;
	currentUser?: UiUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({ reservations, listing, currentUser }) => {
	const category = useMemo(() => {
		return categories.find((category) => category.location === listing.category);
	}, [listing.category]);
	const { title, imageSrc, locationValue, id: listingId } = listing;
	return (
		<Container>
			<div className="max-w-screen-lg mx-auto">
				<div className="flex flex-col gap-6">
					<ListingHead {...{ title, imageSrc, locationValue, listingId, currentUser }} />
				</div>
			</div>
		</Container>
	);
};

export default ListingClient;

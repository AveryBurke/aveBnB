"use client";
import React, { useCallback, useMemo, useState } from "react";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import Heading from "@/app/components/modals/Heading";
import ReservationCard from "@/app/components/ReservationCard";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { BsTrash3 } from "react-icons/bs";

interface ListingClientProps {
	reservations?: UiReservationWithUiListing[];
	listing: UiListingWithUiUser;
	currentUser?: UiUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({ reservations = [], listing, currentUser }) => {
	const category = useMemo(() => {
		return categories.find((category) => category.location === listing.category);
	}, [listing.category]);
	const { title, imageSrc, locationValue, id: listingId, roomCount, bathroomCount, description, guestCount, user } = listing;

	const router = useRouter();

	const [isDeleting, setIsDeleting] = useState(false);
	const [selectedReservation, setSelectedReservation] = useState<string | null>(null);

	const onDeleteReservation = useCallback(
		(id: string) => {
			setIsDeleting(true);
			fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reservations/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: null,
			})
				.then(() => {
					toast.success("Reservation deleted");
					router.refresh();
				})
				.catch(() => toast.error("something went wrong"))
				.finally(() => {
					setSelectedReservation(null);
					setIsDeleting(false);
				});
		},
		[router]
	);

	const onReservationClick = useCallback(
		(id: string) => {
			setSelectedReservation(id);
		},
		[router, setSelectedReservation]
	);

	return (
		<Container>
			<div className="max-w-screen-lg mx-auto">
				<div className="flex flex-col gap-6">
					<ListingHead {...{ title, imageSrc, locationValue, listingId, currentUser }} />
					<div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
						<ListingInfo {...{ roomCount, bathroomCount, description, guestCount, user, category, locationValue }} />
						<div className="order-first mb-10 md:order-last md:col-span-3 ">
							<div className="p-2 mb-2 boder-solid border-[1px] rounded-lg border-neutral-500">
								<Heading title="Reservations" subtitle="reservations placed on this property" />
								<div className="h-[450px] flex flex-col gap-4 overflow-y-scroll">
									{reservations.length === 0 && <div className="text-center mt-4">No reservations yet</div>}
									{reservations.map((reservation) => {
										return (
											<ReservationCard
												key={reservation.id}
												reservation={reservation}
												onClick={onReservationClick}
												selected={selectedReservation === reservation.id}
											/>
										);
									})}
								</div>
							</div>
							{reservations.length > 0 && selectedReservation && (
								<Button label="Delete Reservation" icon={BsTrash3} onClick={() => onDeleteReservation(selectedReservation)} disabled={isDeleting} />
							)}
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default ListingClient;

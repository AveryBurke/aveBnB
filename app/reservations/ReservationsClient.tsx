"use client";
import { toast } from "react-hot-toast";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import Heading from "../components/modals/Heading";
import Container from "../components/container";
import ListingCard from "../components/listings/ListingCard";

interface ReservationsClientProps {
	reservations: UiReservationWithUiListing[];
	currentUser?: UiUser;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({ reservations, currentUser }) => {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState("");

	const onCancel = useCallback(
		(id: string) => {
			setDeletingId(id);
			fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reservations/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: null,
			})
				.then(() => {
					toast.success("Reservation canceled");
					router.refresh();
				})
				.catch(() => toast.error("something went wrong"))
				.finally(() => setDeletingId(""));
		},
		[router]
	);

	return (
		<Container>
			<Heading title="Reservations" subtitle="bookings on your properties" />
			<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
				{reservations.map((res) => (
					<ListingCard
						key={res.id}
						data={res.listing}
						reservation={res}
						actionId={res.id}
						onAction={onCancel}
						disabled={deletingId === res.id}
						actionLabel="Cancel reservation"
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	);
};

export default ReservationsClient;

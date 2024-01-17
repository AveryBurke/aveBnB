import React from "react";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import EmptyState from "@/app/components/EmptyState";
import TripsClient from './TripsClient'

const page = async () => {
	const currentUser = await getCurrentUser();
	if (!currentUser) return <EmptyState title="Unauthorized" subtitle="Please Login" />;
	const reservations = await getReservations({ tag: 1, value: currentUser.id });
    if (reservations.length === 0) return <EmptyState title="No trips found" subtitle="It looks like you haven't book anything yet" />
	return <TripsClient reservations={reservations} currentUser={currentUser}/>;
};

export default page;

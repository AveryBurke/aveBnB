import EmptyState from "../components/EmptyState";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const page = async () => {
	const currentUser = await getCurrentUser();
	if (!currentUser) return <EmptyState title="you are not logged in" subtitle="please login" />;
	const reservations = await getReservations({ tag: 2, value: currentUser.id });
	if (reservations.length === 0)
		return <EmptyState title="No reservations found" subtitle="it looks like you don't have any reservations on your properties" />;
	return <ReservationsClient {...{ reservations, currentUser }} />;
};

export default page;

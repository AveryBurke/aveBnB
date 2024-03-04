import { NextResponse, NextRequest } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { Range } from "react-date-range";

interface ReservationBody extends Range {
	totalPrice: number;
	listingId: string;
}

export async function POST(request: NextRequest) {
	const currentUser = await getCurrentUser();
	if (!currentUser) return NextResponse.error();

	const body: ReservationBody = await request.json();
	const { startDate, endDate, listingId, totalPrice } = body;

	if (!(startDate && endDate && listingId && currentUser.id && totalPrice)) return Response.error();

	const listingAndReservations = await prisma.listing.update({
		where: { id: listingId },
		data: {
			reservations: {
				create: {
					userId: currentUser.id,
					startDate,
					endDate,
					totalPrice,
				},
			},
		},
	});
	return NextResponse.json(listingAndReservations);
}

export async function DELETE(request: Request, params: { reservationId: string }) {

	const currentUser = await getCurrentUser();
	if (!currentUser) return NextResponse.error();

	const { reservationId } = params;

	if (!reservationId || typeof reservationId !== "string") throw new Error("Invalid Id");

	const reservation = await prisma.reservation.delete({
		where: { id: reservationId },
	});

	return NextResponse.json(reservation);
}

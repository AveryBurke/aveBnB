import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface ReservationIParams {
	reservationId?: string;
}

export async function DELETE(request: NextRequest, { params }: { params: ReservationIParams }) {
	const currentUser = await getCurrentUser();
	if (!currentUser) return NextResponse.error();
	const { reservationId } = params;
	if (!(reservationId && typeof reservationId === "string")) throw new Error("Invalid Id");
	const reservations = await prisma.reservation.deleteMany({
		where: {
			id: reservationId,
			OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
		},
	});
	return NextResponse.json(reservations);
}

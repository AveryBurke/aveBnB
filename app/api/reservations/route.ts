import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { Range } from "react-date-range";

interface ReservationBody extends Range {
	totalPrice: number;
	listingId: string;
}

export async function POST(request: Request) {
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

// export async function DELETE(request: Request, { params }: { params: IParams }) {
// 	const currentUser = await getCurrentUser();
// 	if (!currentUser) return NextResponse.error();

// 	const { listingId } = params;

// 	if (!listingId || typeof listingId !== "string") throw new Error("Invalid Id");

// 	let favoriteIds = currentUser.favoriteIds.filter((id) => id !== listingId);

// 	const user = await prisma.user.update({
// 		where: { id: currentUser.id },
// 		data: { favoriteIds },
// 	});

// 	return NextResponse.json(user);
// }

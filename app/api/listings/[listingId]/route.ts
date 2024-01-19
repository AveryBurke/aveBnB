import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();
	if (!currentUser) return NextResponse.error();
	const { listingId } = params;
	if (!(listingId && typeof listingId === "string")) return NextResponse.error();

	const listingings = await prisma.listing.deleteMany({ where: { id: listingId, userId: currentUser.id } });
	return NextResponse.json(listingings);
}
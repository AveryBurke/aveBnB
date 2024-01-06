import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
	listingsId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();
	if (!currentUser) return NextResponse.error();

	const { listingsId } = params;

	if (!listingsId || typeof listingsId !== "string") throw new Error("Invalid Id");

	let favoriteIds = [...currentUser.favoriteIds, listingsId];
	const user = await prisma.user.update({
		where: { id: currentUser.id },
		data: { favoriteIds },
	});

	return NextResponse.json(user);
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();
	if (!currentUser) return NextResponse.error();

	const { listingsId } = params;

	if (!listingsId || typeof listingsId !== "string") throw new Error("Invalid Id");

	let favoriteIds = currentUser.favoriteIds.filter((id) => id !== listingsId);

	const user = await prisma.user.update({
		where: { id: currentUser.id },
		data: { favoriteIds },
	});

	return NextResponse.json(user);
}

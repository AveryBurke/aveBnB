import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";


export async function POST(request: NextRequest) {
	const currentUser = await getCurrentUser();

	if (!currentUser) return NextResponse.error();

	const body = await request.json();
	const {
		title,
		description,
		imageSrc,
		category,
		roomCount,
		bathroomCount,
		guestCount,
		locationValue,
		price,
	} = body;

	//TODO VALIDATE BODY	

	const listing = await prisma.listing.create({
		data: {
			title,
			description,
			imageSrc,
			category,
			roomCount,
			bathroomCount,
			guestCount,
			locationValue: locationValue.value,
			price: parseInt(price, 10),
            userId: currentUser.id
		},
	});

	return NextResponse.json({listing});
}

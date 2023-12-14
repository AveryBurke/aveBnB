import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: NextRequest) {
	const body = await request.json();
	const { email, name, password }: { email: string; name: string; password: string } = body;

	const hashPassword = await hash(password, 12);

	const user = await prisma.user.create({
		data: {
			email,
			name,
			hashPassword,
		},
	});

	console.log({user})

	return NextResponse.json(user);
}

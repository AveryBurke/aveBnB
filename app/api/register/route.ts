import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: NextRequest) {
	const body = await request.json();
	const { email, name, password }: { email: string; name: string; password: string } = body;
	const hashPassword = await hash(password, 12);
	const data = {email, name, hashPassword}
	const user = await prisma.user.create({
		data: {
			...data
		},
	});	
	return NextResponse.json(user);
}

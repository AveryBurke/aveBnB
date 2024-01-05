import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/app/libs/prismadb";

export async function getSession(): Promise<Session | null | undefined> {
	return getServerSession(authOptions);
}

export async function getCurrentUser(): Promise<UiUser | null> {
	console.log("calling get user with test env ", process.env.TEST_USER_NAME);
	try {
		const session = await getSession();
		if (!session?.user?.email) return null;
		const currentUser = await prisma.user.findUnique({ where: { email: session.user.email } });
		// const currentUser = await prisma.user.findUnique({ where: { email: process.env.TEST_USER_EMAIL } });
		if (!currentUser) return null;
		return {
			...currentUser,
			emailVerified: currentUser.emailVerified?.toISOString() || "",
			createdAt: currentUser.createdAt.toISOString() || "",
			updatedAt: currentUser.updatedAt.toISOString() || "",
		};
	} catch (error: any) {
		return null;
	}
}

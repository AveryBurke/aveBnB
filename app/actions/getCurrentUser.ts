import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
	return getServerSession(authOptions);
}

export async function getCurrentUser() {
	try {
		const session = await getSession();
		if (!session?.user?.email) return;
		const currentUser = prisma.user.findUnique({ where: { email: session.user.email } });
		if (!currentUser) return;
		return currentUser;
	} catch (error: any) {
		return;
	}
}

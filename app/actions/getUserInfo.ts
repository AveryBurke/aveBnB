"use server"
import prisma from "@/app/libs/prismadb";


export default async function getCurrentUser(id:string): Promise<UiUser | null> {
	try {
		const user = await prisma.user.findUnique({ where: { id } });
		if (!user) return null;
		return {
			...user,
			emailVerified: user.emailVerified?.toISOString() || "",
			createdAt: user.createdAt.toISOString() || "",
			updatedAt: user.updatedAt.toISOString() || "",
		};
	} catch (error: any) {
		return null;
	}
}

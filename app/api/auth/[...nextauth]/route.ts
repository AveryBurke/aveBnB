import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import prisma from "../../../libs/prismadb";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
	adapter: (function async(){
		// console.log({prisma,PrismaAdapter})
		return PrismaAdapter(prisma)})(),
	providers: [
		GithubProvider({ clientId: (process.env.GITHUB_ID as string) || "", clientSecret: (process.env.GITHUB_SECRET as string) || "" }),
		GoogleProvider({ clientId: (process.env.GOOGLE_CLIENT_ID as string) || "", clientSecret: (process.env.GOOGLE_CLIENT_SECRET as string) || "" }),
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "email", type: "text" },
				password: { label: "password", type: "text" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) throw new Error("Invalid Credentials");
				const user = await prisma.user.findUnique({ where: { email: credentials.email } });
				if (!user || !user.hashPassword) throw new Error("Invalid Credentials");
				const valid = await compare(credentials.password, user.hashPassword);
				if (valid) return user;
				throw new Error("Invalid Credentials");
			},
		}),
	],
	pages: {
		signIn: "/",
	},
	debug: process.env.NODE_ENV === "development",
	session: { strategy: "jwt" },
	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

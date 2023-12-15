/**
 * @jest-environment node
 */
import { prismaMock } from "@/app/libs/singelton";
import { POST } from "../route";
import { hash } from "bcrypt";
import httpMocks from "node-mocks-http";
import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";
import { instance, mock, reset, when } from "ts-mockito";
import prisma from "@/app/libs/prismadb";

interface UserCredentials {
	name: string;
	email: string;
	password: string;
}

const mockedRequest: NextRequest = mock(NextRequest);

afterEach(() => {
	reset(mockedRequest);
});

describe("Auth api", () => {
	describe("Behavior", () => {
		it("should create a new user", async () => {
			// const url = new URL("/api/auth/register", "http://localhost:3000/");
			// const nextUrl = new NextURL(url);
			function returnFromJson() {
				return new Promise<any>((resolve, reject) => {
					const credentials = {
						name: "Test User",
						email: "User@userillusion.com",
						password: "123456",
					};
					resolve(credentials);
				});
			}
			// when(mockedRequest.nextUrl).thenReturn(nextUrl);
			when(mockedRequest.json()).thenCall(returnFromJson);

			// // when(mockedRequest.credentials).thenReturn(credentials);
			const password = "123456";
			const hashPassword = await hash(password, 12);
			const userWithHash = {
				name: "Test User",
				email: "User@userillusion.com",
				hashPassword,
			};
			// const userWithoutHash = {
			// 	name: "Test User",
			// 	email: "User@userillusion.com",
			// 	password,
			// };

			// const user = await prisma.user.create({ data: { ...userWithHash } });


			// // const { req, res } = httpMocks.createMocks({
			// // 	method: "POST",
			// // 	body: {
			// // 		...,
			// // 	},
			// // });
			const resp = await POST(instance(mockedRequest));

			expect(resp).toBeTruthy();
		});
	});
});

/**
 * @jest-environment node
 */
import { POST } from "../route";
import { NextRequest } from "next/server";
import { instance, mock, reset, when } from "ts-mockito";
import prisma from "@/app/libs/prismadb";


const mockedRequest: NextRequest = mock(NextRequest);

afterEach(() => {
	reset(mockedRequest);
});

afterAll(() => {
    prisma.user.delete({where:{email:"new@user.com"}})
})

describe("Register Post", () => {
	describe("Behavior", () => {
		it("should create a new user", async () => {
            const newUser = {name:"New User", email:"new@user.com", password:"newuser4life"}
			function returnFromJson() {
				return new Promise<any>((resolve, reject) => {
					resolve(newUser);
				});
			}
			when(mockedRequest.json()).thenCall(returnFromJson);
			const resp = await POST(instance(mockedRequest));
            const sameUser = prisma.user.findUnique({where:{email:newUser.email}})
			expect(resp.status).toBe(200);
            expect(sameUser).toBeTruthy();
		});

	});
});
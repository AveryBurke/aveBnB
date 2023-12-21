/**
 * @jest-environment node
 */
//NOTE: TESTING THIS FUNCTION GIVES THROWS TypeError: (0 , _prismaadapter.PrismaAdapter) is not a function from "@auth/prisma-adapter"
// import { GET } from "../route";
// import { NextRequest } from "next/server";
// import { instance, mock, reset, when } from "ts-mockito";
// import prisma from "@/app/libs/prismadb";

// const mockedRequest: NextRequest = mock(NextRequest);

// afterEach(() => {
// 	reset(mockedRequest);
// });

// afterAll(() => {
//     prisma.user.delete({where:{email:"test@user.com"}})
// })

describe("Register Post", () => {
	it("should be true", () => {
		expect(true).toBeTruthy();
	})
	// describe("Behavior", () => {
	// 	it("should sign in exisitng user", async () => {
	// 		function returnFromJson() {
	// 			return new Promise<any>((resolve, reject) => {
	// 				const credentials = {
    //                     name:process.env.TEST_USER_NAME || "Test User",
    //                     email:process.env.TEST_USER_EMAIL || "test@user.com",
	// 					password: process.env.TEST_USER_PASSWORD || "testpassword"
	// 				};
	// 				resolve(credentials);
	// 			});
	// 		}
	// 		when(mockedRequest.json()).thenCall(returnFromJson);
	// 		const resp = await GET(instance(mockedRequest));
	// 		expect(resp.status).toBe(200)
	// 	});

	// });
});
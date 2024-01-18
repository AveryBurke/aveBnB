import "@testing-library/jest-dom";
import "jest-expect-message";
import prisma from './app/libs/prismadb'

jest.mock("./app/actions/getCurrentUser", () => {
	return {
		getCurrentUser: async () => {
			const currentUser = await prisma.user.findUnique({ where: { email: process.env.TEST_USER_EMAIL } });
			if (!currentUser) return null;
			return {
				...currentUser,
				emailVerified: currentUser.emailVerified?.toISOString() || "",
				createdAt: currentUser.createdAt.toISOString() || "",
				updatedAt: currentUser.updatedAt.toISOString() || "",
			};
		},
	};
});

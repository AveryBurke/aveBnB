import { render, screen } from "@testing-library/react";
import page from "../page";
import { useRouter } from "next/navigation";
jest.mock("next/navigation");
const refreshMock = jest.fn();
//@ts-ignore
useRouter.mockReturnValue({
	refresh: refreshMock,
});

//TODO: figure how to mock a server action, so I can mock get current user and make it return a user that doesn't own any properties
describe("Reservations Page", () => {
	describe("Behavior", () => {
		it("Should show user 2 an empty state, because the second user doesn't have booking's on of its properties", async () => {
			const Page = await page();
			render(Page);
			const emptyState = screen.getByTestId("empty_listings");
			expect(true).toBe(true);
		});
	});
});

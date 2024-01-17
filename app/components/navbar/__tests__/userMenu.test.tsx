import { render, screen, fireEvent } from "@testing-library/react";
import UserMenu from "../userMenu";
import { useRouter } from "next/navigation";

jest.mock("next/navigation");

const pushMock = jest.fn();

//@ts-ignore
useRouter.mockReturnValue({
	push: pushMock,
});

const mockUser: UiUser = {
	id: "",
	name: "User McFakie",
	createdAt: "",
	updatedAt: "",
	favoriteIds: [""],
	email: null,
	emailVerified: null,
	hashPassword: null,
	image: null,
};

describe("UserMenu", () => {
	describe("Render", () => {
		it("should render the app name", () => {
			render(<UserMenu />);
			const appName = screen.getByText("AveBnB");
			expect(appName).toBeInTheDocument();
		});
		it("should render the user menu icon", () => {
			render(<UserMenu />);
			const menuIcon = screen.getByTestId("user_menu_icon");
			expect(menuIcon).toBeInTheDocument();
		});
	});
	describe("Behavior", () => {
		it("should show sign up and login menu items when a user is not logged in", () => {
			render(<UserMenu />);
			fireEvent.click(screen.getByTestId("user_menu_icon"));
			const signInItem = screen.getByText("sign in");
			const signUpItem = screen.getByText("sign up");
			expect(signInItem).toBeInTheDocument();
			expect(signUpItem).toBeInTheDocument();
		});
		it("should show personalized menu when a user is logged in", () => {
			render(<UserMenu user={mockUser} />);
			fireEvent.click(screen.getByTestId("user_menu_icon"));
			const tipsItem = screen.getByText("My Trips");
			const favoritespItem = screen.getByText("My Favroites");
			const propertiesItem = screen.getByText("My Properties");
			const aveItem = screen.getByText("Let AveBnB into my home");
			const signoutitem = screen.getByText("sign out");
			expect(tipsItem).toBeInTheDocument();
			expect(favoritespItem).toBeInTheDocument();
			expect(propertiesItem).toBeInTheDocument();
			expect(aveItem).toBeInTheDocument();
			expect(signoutitem).toBeInTheDocument();
		});
	});
});

import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Navbar from "../navbar";
import Logo from "../../logo"
import { useRouter, useSearchParams } from "next/navigation";

jest.mock("next/navigation");
const pushMock = jest.fn();
const mockGet = jest.fn();
//@ts-ignore
useRouter.mockReturnValue({
	push: pushMock,
});
//@ts-ignore
useSearchParams.mockReturnValue({
	get: mockGet,
});

afterEach(() => {
	cleanup();
});


describe("Navbar", () => {
	describe("Render", () => {
		it("should render the app logo", () => {
			render(<Navbar />);
			const appLogo = screen.getByTestId("logo");
			expect(appLogo).toBeInTheDocument();
		});
		it("should render the search menu", () => {
			render(<Navbar />);
			const search = screen.getByTestId("search");
			expect(search).toBeInTheDocument();
		});
		it("should render the user menu", () => {
			render(<Navbar />);
			const userMenu = screen.getByTestId("user_menu_icon");
			expect(userMenu).toBeInTheDocument();
		});
		it("should render the user avatar", () => {
			render(<Navbar />);
			const userMenu = screen.getByTestId("avatar");
			expect(userMenu).toBeInTheDocument();
		});
	});
    describe("Behavior", () => {
        // if I want to have really good test coverage I could push every catagory button and test the url
        // but this would just amount to testing query-stirng.
        // I'm just adding some tests here in order to make user nextjs testing isn't super buggy
        it("should call the app router with '/'", () => {
            render(<Navbar />);
			const appLogo = screen.getByTestId("logo");
            fireEvent.click(appLogo);
            expect(pushMock).toHaveBeenCalledWith("/");
        })
    })
});

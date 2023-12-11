import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Navbar from "../navbar";

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
	});
});

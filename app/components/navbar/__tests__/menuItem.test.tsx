import { render, screen, fireEvent } from "@testing-library/react";
import MenuItem from "../menuItem";
const mockAction = jest.fn();

describe("MenuItem", () => {
	describe("Render", () => {
		it("should render the label", () => {
			render(<MenuItem callback={() => {}} label="test menu item" />);
			const menuItemText = screen.getByText("test menu item");
			expect(menuItemText).toBeInTheDocument();
		});
	});
	describe("Behavior", () => {
		it("should fire action", () => {
			render(<MenuItem callback={mockAction} label="test menu item" />);
			fireEvent.click(screen.getByTestId("menu_item"));
			expect(mockAction).toHaveBeenCalled();
		});
	});
});

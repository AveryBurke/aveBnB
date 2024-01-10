import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";


const mockOnClick = jest.fn();
const mockOnClick2 = jest.fn();

describe("Button", () => {
	describe("Render", () => {
		it("should display a label", () => {
			render(<Button {...{ onClick: () => {}, label: "test label" }} />);
			const button = screen.getByRole("button");
			expect(button).toHaveTextContent("test label");
		});
	});
	describe("Behavior", () => {
		it("should fire click event", () => {
			render(<Button {...{ onClick: mockOnClick, label: "test label" }} />);
			fireEvent.click(screen.getByRole("button"));
			expect(mockOnClick).toHaveBeenCalled();
		});
		it("should be able to be disapbled when prop is passed", () => {
			render(<Button {...{ onClick: mockOnClick2, label: "test label", disabled: true }} />);
			fireEvent.click(screen.getByRole("button"));
			expect(mockOnClick2).not.toHaveBeenCalled();
		});
	});
});

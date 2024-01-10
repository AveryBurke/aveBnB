import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../Modal";

const mockSubmit = jest.fn();
const mockClose = jest.fn();

//the close event is delayed by 300ms to accomidate animation
jest.useFakeTimers();

describe("Modal", () => {
	describe("Render", () => {
		it("should not render when it's not open", () => {
			render(<Modal onSubmit={mockSubmit} actionLabel="test action label" onClose={mockClose} />);
			const modal = screen.queryByTestId("modal_content");
			expect(modal).not.toBeInTheDocument();
		});
		it("should render when it's open", () => {
			render(<Modal onSubmit={mockSubmit} actionLabel="test action label" onClose={mockClose} isOpen />);
			const modal = screen.queryByTestId("modal_content");
			expect(modal).toBeInTheDocument();
		});
	});
	describe("Behavior", () => {
		it("should fire close event", () => {
			render(<Modal onSubmit={mockSubmit} actionLabel="test action label" onClose={mockClose} isOpen />);
			fireEvent.click(screen.getByTestId("close_button"));
			setTimeout(() => {
				expect(mockClose).toHaveBeenCalled();
			}, 301);
		});
		it("should close the modal on a close event", () => {
			render(<Modal onSubmit={mockSubmit} actionLabel="test action label" onClose={mockClose} isOpen />);
			fireEvent.click(screen.getByTestId("close_button"));
			setTimeout(() => {
				const modal = screen.queryByTestId("modal_content");
				expect(modal).not.toBeInTheDocument();
			}, 301);
		});
	});
});

import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import RentModal from "../RentModal";
// import * as axios from "axios";

const refreshMock = jest.fn();

jest.mock("next/navigation");

//@ts-ignore
useRouter.mockReturnValue({
	refresh: refreshMock,
});

//@ts-ignore

jest.useFakeTimers();

afterEach(() => {
	cleanup();
});

describe("RentModal", () => {
	describe("Render", () => {
		it("should render the first step", () => {
			render(<RentModal />);
			setTimeout(() => {
				const heading = screen.getByText("which of these best describes your place?");
				expect(heading).toBeInTheDocument();
			}, 301);
		});
	});
	describe("Behavior", () => {
		it("should render the setps in order", () => {
			render(<RentModal />);
			setTimeout(() => {
				const heading = screen.getByText("which of these best describes your place?");
				expect(heading).toBeInTheDocument();
				fireEvent.click(screen.getByTestId("action_button"));
			}, 301);
			setTimeout(() => {
				const heading = screen.getByText("Where is your place located?");
				expect(heading).toBeInTheDocument();
				fireEvent.click(screen.getByTestId("action_button"));
			}, 301);
			setTimeout(() => {
				const heading = screen.getByText("Tell us more about your place");
				expect(heading).toBeInTheDocument();
				fireEvent.click(screen.getByTestId("action_button"));
			}, 301);
			setTimeout(() => {
				const heading = screen.getByText("What does your place look like?");
				expect(heading).toBeInTheDocument();
				fireEvent.click(screen.getByTestId("action_button"));
			}, 301);
			setTimeout(() => {
				const heading = screen.getByText("How would you describe your place?");
				expect(heading).toBeInTheDocument();
				fireEvent.click(screen.getByTestId("action_button"));
			}, 301);
			setTimeout(() => {
				const heading = screen.getByText("Name your price!");
				expect(heading).toBeInTheDocument();
				fireEvent.click(screen.getByTestId("action_button"));
			}, 301);
		});
	});
});

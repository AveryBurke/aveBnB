import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { useFavorite } from "../../../hooks/useFavorite";
import HeartButton from "../HeartButton";
import { useRouter } from "next/navigation";

afterEach(() => {
	cleanup();
});

jest.mock("next/navigation");
jest.mock("../../../hooks/useFavorite");

const refreshMock = jest.fn();

//@ts-ignore
useRouter.mockReturnValue({
	refresh: refreshMock,
});

//NOTE: I understand these tests are trival. I just want to get as much exprince testing Next app router as I can
describe("HeartButton", () => {
	describe("render", () => {
		it("should be neutral", () => {
			//@ts-ignore
			useFavorite.mockReturnValue({
				hasFavorited: false,
				toggleFavorite: () => {},
			});
			render(<HeartButton listingId="" />);
			const fill = screen.getByTestId("inner-heart");
			expect(fill).toHaveAttribute("class", "fill-neutral-500/70");
		});

		it("should be rose", () => {
			//@ts-ignore
			useFavorite.mockReturnValue({
				hasFavorited: true,
				toggleFavorite: () => {},
			});
			render(<HeartButton listingId="" />);
			const fill = screen.getByTestId("inner-heart");
			expect(fill).toHaveAttribute("class", "fill-rose-500");
		});
	});

	describe("Behavior", () => {
		it("should call toggle function", () => {
            const mockToggle = jest.fn();
			//@ts-ignore
			useFavorite.mockReturnValue({
				hasFavorited: true,
				toggleFavorited: mockToggle,
			});
			render(<HeartButton listingId="" />);
			fireEvent.click(screen.getByTestId("heart-button"));
			expect(mockToggle).toHaveBeenCalled();
		});
	});
});

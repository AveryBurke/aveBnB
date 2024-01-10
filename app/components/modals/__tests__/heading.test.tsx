import { render, screen } from "@testing-library/react";
import Heading from "../Heading";


describe("Heading", () => {
	describe("Render", () => {
		it("should render title and subtitle", () => {
			render(<Heading title="Test heading title" subtitle="Test heading subtitle" />);
			const title = screen.getByText("Test heading title");
			const subtitle = screen.getByText("Test heading subtitle");
			expect(title).toBeInTheDocument();
			expect(subtitle).toBeInTheDocument();
		});
	});
});

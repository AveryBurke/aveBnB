import { renderHook, render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FieldValues, useForm } from "react-hook-form";
import Input from "../Input";

const { result } = renderHook(() =>
	useForm<FieldValues>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	})
);

afterEach(() => {
	cleanup();
});

describe("Input", () => {
	describe("Render", () => {
		it("should a render label", () => {
			render(<Input label="email" id="email" register={result.current.register} errors={result.current.formState.errors} />);
			const label = screen.getByLabelText("email");
			expect(label).toBeInTheDocument();
		});
	});
	describe("Behavior", () => {
		it("should be able to add text to the input", async () => {
			render(<Input label="name" id="name" register={result.current.register} errors={result.current.formState.errors} />);
			const input = screen.getByRole("textbox");
			await userEvent.type(input, "my user name");
			expect(input).toHaveValue("my user name");
		});
	});
});

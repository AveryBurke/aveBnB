"use client";
import React from "react";
import { IconType } from "react-icons";

interface CategoryInputProps {
	icon: IconType;
	selected?: Boolean;
	label: string;
	onClick: (val: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({ icon: Icon, selected, label, onClick }) => {
	return (
		<div
			key={label}
			onClick={() => onClick(label)}
			className={
				"flex flex-col rounded-xl border-2 hover:border-black p-4 cursor-pointer gap-3 transition " + (selected ? "border-black" : "border-neutral-200")
			}>
			<Icon size={30} />
			<div className=" font-semibold">{label}</div>
		</div>
	);
};

export default CategoryInput;

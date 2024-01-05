"use client";
import React from "react";
import { IconType } from "react-icons";
interface ButtonProps {
	label: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	outline?: boolean;
	sm?: boolean;
	icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled, outline, sm, icon: Icon }) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`relative 
            disabled: opacity-70 
            disabled:cursor-not-allowed 
            rounded-lg 
            transition 
            w-full 
            tracking-wider
            ${outline ? "bg-white border-black text-black " : "bg-rose-600 border-rose-600 text-white"} 
            ${sm ? "py-1 text-sm font-light border-[1px]" : "py-3 text-md font-semibold border-[2px]"}`}>
			{Icon && <Icon size={24} className="absolute left-4 top-3" />}
			{label}
		</button>
	);
};

export default Button;

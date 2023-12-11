import React from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
	id: string;
	label: string;
	type?: string;
	disapbled?: boolean;
	formatPrice?: boolean;
	required?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({ id, label, type, disapbled, formatPrice, required, register, errors }) => {
	return (
		<div className="w-full relative">
			{formatPrice && <BiDollar size={24} className="text-neutral-700 absolute top-5 left-2" />}
			<input
				id={id}
				type={type}
				{...register(id, { required })}
				placeholder=" "
				className={`peer 
                        w-full 
                        p-4 
                        pt-6
                        bg-white 
                        font-light 
                        border-2 
                        rounded-md 
                        outline-none 
                        transition 
                        disabled:opacity-70 
                        disabled:cursor-not-allowed 
                        ${formatPrice ? "pl-9" : "pl-4"}
                        ${errors[id] ? "border-rose-500 focus:border-rose-500" : "border-neutral-300 focus:border-black"}`}
			/>
            {/* I hate animation that doens't convey information to the user.  But it's nice to know how to do CSS animiation in Tailwind */}
			<label
                        htmlFor = {id}
				className={`absolute 
                        text-md 
                        duration-150 
                        transform 
                        -translate-y-3 
                        top-5 
                        z-10 
                        origin-[0] 
                        ${formatPrice ? "left-9" : "left-4"} 
                        peer-placeholder-shown:scale-100 
                        peer-placeholder-shown:translate-y-0 
                        peer-focus:scale-75 
                        peer-focus:-translate-y-4
                        ${errors[id] ? "text-rose-500" : "text-zinc-500"}`}>
				{label}
			</label>
		</div>
	);
};

export default Input;

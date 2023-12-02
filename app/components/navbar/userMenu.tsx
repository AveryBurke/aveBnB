"use client";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../avatar";

const userMenu = () => {
	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				<div
					className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
					onClick={() => console.log("click!")}>
					avebandb
				</div>
				<div
					onClick={() => console.log("click!")}
					className="
                    p-4 
                    md:py-1 
                    md:px-2 
                    border-[1px] 
                    border-neutral-200 
                    flex 
                    flex-row 
                    items-center 
                    rounded-full 
                    gap-3
                    cursor-pointer 
                    hover:shadow-sm 
                    transtion">
					<AiOutlineMenu />
					<div className="hidden md:block">
						<Avatar />
					</div>
				</div>
			</div>
		</div>
	);
};

export default userMenu;

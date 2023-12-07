"use client";
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../avatar";
import MenuItem from "./menuItem";
import useRegisterModal from "@/app/hooks/useRegistarModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

interface UserMenuProps {
	user?: User | null;
}

const userMenu: React.FC<UserMenuProps> = ({ user }) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => {
		setIsOpen(!isOpen);
	};
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				<div
					className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
					onClick={() => console.log("click!")}>
					AveBnB
				</div>
				<div
					onClick={toggle}
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
			{isOpen && (
				<div
					className="
                            absolute 
                            rounded-xl 
                            shadow-md 
                            w-[40vw]
                            md:w-3/4 
                            bg-white 
                            overflow-hidden
                            right-0
                            top-12
                            text-sm">
					<div className="flex flex-col cursor-pointer">
						{user ? (
							<>
							<MenuItem {...{ callback: () => {}, label: "My Trips" }} />
							<MenuItem {...{ callback: () => {}, label: "My Favroites" }} />
							<MenuItem {...{ callback: () => {}, label: "My Properties" }} />
							<MenuItem {...{ callback: () => {}, label: "Let AveBnB into my home" }} />
							<MenuItem {...{ callback:signOut, label: "sign out" }} />
							</>
						) : (
							<>
								<MenuItem {...{ callback: loginModal.onOpen, label: "sign in" }} />
								<MenuItem {...{ callback: registerModal.onOpen, label: "sign up" }} />
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default userMenu;

"use client";
import React, { useState, useEffect, useRef } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../avatar";
import MenuItem from "./menuItem";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useRegisterModal from "@/app/hooks/useRegistarModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";

interface UserMenuProps {
	user?: UiUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
	const router = useRouter();
	const ref = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => {
		setIsOpen(!isOpen);
	};
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const rentModal = useRentModal();

	//close the menu if either modal is open
	useEffect(() => {
		if (registerModal.isOpen || loginModal.isOpen) setIsOpen(false);
	}, [registerModal.isOpen, loginModal.isOpen]);

	//close the menu if the user clicks on something else
	useEffect(() =>
		window.addEventListener("click", (e) => {
			if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
		})
	);

	const handleClick = () => {
		if (!user) return loginModal.onOpen();
		return rentModal.onOpen();
	};

	return (
		<div ref={ref} className="relative">
			<div className="flex flex-row items-center gap-3">
				<div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer" onClick={handleClick}>
					AveBnB
				</div>
				<div
					data-testid="user_menu_icon"
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
						<Avatar src={user?.image} />
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
								<MenuItem {...{ callback: () => router.push("/trips"), label: "My Trips" }} />
								<MenuItem {...{ callback: () => router.push("/reservations"), label: "My Reservations" }} />
								<MenuItem {...{ callback: () => router.push("/favorites"), label: "My Favroites" }} />
								<MenuItem {...{ callback: () => {}, label: "My Properties" }} />
								<MenuItem {...{ callback: rentModal.onOpen, label: "Let AveBnB into my home" }} />
								<MenuItem {...{ callback: signOut, label: "sign out" }} />
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

export default UserMenu;

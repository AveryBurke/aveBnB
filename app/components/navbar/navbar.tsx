import React from "react";
import Container from "../container";
import Logo from "../logo";
import Search from "./search";
import UserMenu from "./userMenu";
import { User } from "@prisma/client";

interface NavbarProps {
	user?: User | null;
}

const navbar:React.FC<NavbarProps> = ({user}) => {
	return (
		<div className="w-full bg-white z-10">
			<div className="border-[1px] shadow-sm">
				<Container>
					<div className="flex flex-row items-center justify-between gap-3 md:gap-0">
						<Logo />
						<Search />
						<UserMenu user = {user} />
					</div>
				</Container>
			</div>
		</div>
	);
}

export default navbar;

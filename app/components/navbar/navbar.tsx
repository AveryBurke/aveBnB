import React from "react";
import Container from "../container";
import Logo from "../logo";
import Search from "./search";
import UserMenu from "./userMenu";
import Categories from "./Categories";
import Link from "next/link";

interface NavbarProps {
	user?: UiUser | null;
}

const navbar: React.FC<NavbarProps> = ({ user }) => {
	return (
		<div className="w-full bg-white z-10">
			<div className="border-[1px] shadow-sm">
				<Container>
					<div className="flex flex-row items-center justify-between gap-3 md:gap-0">
						<div className="flex flex-row items-center justify-between gap-3">
							<Logo />
							<Link
								href="https://docs.google.com/document/d/1gPPUfcy52hx8I-VSff_W4C9HQ2uiLeWq7Tev6wAxfkw/edit?usp=sharing"
								className="text-xs text-neutral-500">
								Our privacy policy
							</Link>
						</div>
						<Search />
						<UserMenu user={user} />
					</div>
				</Container>
			</div>
			<Categories />
		</div>
	);
};

export default navbar;

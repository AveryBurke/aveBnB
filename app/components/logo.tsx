"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const logo = () => {
	const rounter = useRouter();
	return (
		<Image
			onClick={() => rounter.push("/")}
			data-testid="logo"
			alt='"Logo'
			className="hidden md:block cursor-pointer"
			height="50"
			width="50"
			src="/images/logo.png"
		/>
	);
};

export default logo;

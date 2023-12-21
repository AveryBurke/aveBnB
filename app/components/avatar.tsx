"use client";
import React from "react";
import Image from "next/image";

interface AvatarProps {
	src?:string | null
}
const avatar:React.FC<AvatarProps> = ({src}) => {
	return <Image data-testid = "avatar" className="rounded-full" width="30" height="30" alt="avatar" src={src || "/images/placeholder.jpg"} />;
};

export default avatar;

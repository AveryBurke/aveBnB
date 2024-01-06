"use client"
import React from "react";
import { useFavorite } from "../hooks/useFavorite";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
	listingId: string;
	currentUser?: UiUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({ listingId, currentUser }) => {
	const {hasFavorited, toggleFavorited} = useFavorite({listingId,currentUser});
	return <div onClick={toggleFavorited} className=" relative hover:opacity-80 cursor-pointer transition">
        <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]" />
        <AiFillHeart size={24} className = {hasFavorited ?  "fill-rose-500" : "fill-neutral-500/70"}/>
    </div>;
};

export default HeartButton;

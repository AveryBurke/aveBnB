"use client";
import React, { useMemo } from "react";
import { useFavorite } from "../../hooks/useFavorite";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
	listingId: string;
	currentUser?: UiUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({ listingId, currentUser }) => {
	const { hasFavorited, toggleFavorited } = useFavorite({ listingId, currentUser });
	const fav = useMemo(() => hasFavorited, [hasFavorited]);
	return (
		<div data-testid="heart-button" onClick={toggleFavorited} className="relative hover:opacity-80 cursor-pointer transition">
			<AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]" />
			<AiFillHeart data-testid="inner-heart" size={24} className={fav ? "fill-rose-500" : "fill-neutral-500/70"} />
		</div>
	);
};

export default HeartButton;

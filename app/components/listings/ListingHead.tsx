"use client"
import React from "react";
import useCountries from "@/app/hooks/useCountries";
import Heading from "../modals/Heading";
import Image from "next/image";
import HeartButton from "./HeartButton";

interface ListingHeadProps {
	title: string;
	imageSrc: string;
	locationValue: string;
	listingId: string;
	currentUser?: UiUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({ listingId, imageSrc, locationValue, title, currentUser }) => {
	const { getByValue } = useCountries();
	const location = getByValue(locationValue);
	return (
		<>
			<Heading title={title} subtitle={`${location?.region}, ${location?.label}`} />
			<div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
				<Image alt="Image" src={imageSrc} fill className="object-cover w-full" priority />
				<div className="absolute top-5 right-5">
					<HeartButton {...{ listingId, currentUser }} />
				</div>
			</div>
		</>
	);
};

export default ListingHead;

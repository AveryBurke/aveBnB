"use client";
import { Reservation } from "@prisma/client";
import useCountries from "@/app/hooks/useCountries";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "./HeartButton";
import Button from "../Button";

interface ListingCardProps {
	data: UiListing;
	reservation?: UiReservationWithUiListing
	onAction?: (id: string) => void;
	disabled?: boolean;
	actionLabel?: string;
	actionId?: string;
	currentUser?: UiUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({ data, reservation, onAction, disabled, actionId = "", actionLabel, currentUser }) => {
	const router = useRouter();
	const { getByValue } = useCountries();
	const location = getByValue(data.locationValue);
	const hanldeCancel = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();
			if (disabled) return;
			onAction?.(actionId);
		},
		[onAction, actionId, disabled]
	);

	const price = useMemo(() => {
		if (reservation) return reservation.totalPrice;
		return data.price;
	}, [reservation, data.price]);

	const reservationDate = useMemo(() => {
		if (!reservation) return null;
		const start = new Date(reservation.startDate);
		const end = new Date(reservation.endDate);
		return `${format(start, "PP")} - ${format(end, "PP")}`;
	}, [reservation]);

	return (
		<div onClick={() => router.push(`/listings/${data.id}`)} className="col-span-1 cursor-pointer group">
			<div className="flex flex-col gap-2 w-full">
				<div className="aspect-square w-full relative overflow-hidden rounded-xl">
					<Image
						/*
							NOTE: I was having trouble getting these images to show up. I assumed this had to do with a warinig
							I was getting: "warn-once.js:16 Image with src ... has "fill" but is missing "sizes" prop. Please add it to improve page performance"
							Adding the "sizes" prop lead to a further warning that the parent component didn't have a height. this wanring didn't go away once I added an explicit height to the all parents in the tree.
							finally I rearanged the order of the props and the images showed up.
							This can't be due to the order of the prosp, as they are stored in a JS object. The only thing I can think is that I was seeing weird caching behavior
							I still have the warning about the "sizes" prop, but it's just a warning
						*/
						alt="Listing"
						src={data.imageSrc}
						fill
						className="object-cover w-full group-hover:scale-110 transition"
					/>
					<div className="absolute top-3 right-3">
						<HeartButton listingId={data.id} currentUser={currentUser} />
					</div>
				</div>
				<div className="font-semibold text-lg">
					{location?.region}, {location?.label}
				</div>
				<div className="font-light text-sm text-neutral-500">{reservationDate || data.category}</div>
				<div className="flex flex-row items-center gap-1">
					<div className=" font-semibold">${price}</div>
					{!reservation && <div className="font-light">night</div>}
				</div>
				{onAction && actionLabel && <Button disabled={disabled} sm label={actionLabel} onClick={hanldeCancel} />}
			</div>
		</div>
	);
};

export default ListingCard;

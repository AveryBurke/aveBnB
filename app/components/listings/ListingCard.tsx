"use client";
import { Listing, Reservation } from "@prisma/client";
import useCountries from "@/app/hooks/useContries";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
	data: Listing;
	reservation?: Reservation;
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
							NOTE: something is wrong with the fill prop. If I use fill the image does not show up and I get an errro
							to the effect that I need to also use the sizes prop if I am going to use the fill prop.
							if I use the sizes prop I get a warning that the image has no height. this warning does not go away
							even if I supply an explicit hight for all the parent divs
						*/
						// fill
						width={250}
						height={250}
						className="object-cover h-full w-full group-hover:scale-110 transition"
						src={data.imageSrc}
						alt="Listing"
					/>
					<div className="absolute top-3 right-3">
						<HeartButton listingId={data.id} />
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
				{onAction && actionLabel && <Button disabled={disabled} sm label={actionLabel} onClick={hanldeCancel}/>}
			</div>
		</div>
	);
};

export default ListingCard;

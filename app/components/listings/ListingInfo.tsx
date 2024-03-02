import React from "react";
import useCountries from "@/app/hooks/useCountries";
import dynamic from "next/dynamic";
import Avatar from "../avatar";
import ListingCategory from "./ListingCategory";

interface ListingInfoProps {
	user?: UiUser | null;
	roomCount: number;
	bathroomCount: number;
	description: string;
	guestCount: number;
	category?: Category | null;
	locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({ user, roomCount, bathroomCount, description, guestCount, category, locationValue }) => {
	const { getByValue } = useCountries();
	const coords = getByValue(locationValue)?.latlang;

	const Map = dynamic(() => import("../Map"), { ssr: false });

	return (
		<div className="col-span-4 flex flex-col gap-8">
			<div className="flex flex-col gap-2">
				<div className="text-xl font-semibold flex flex-row items-center gap-2">
					<div>hosted by {user?.name}</div>
					<Avatar src={user?.image} />
				</div>
				<div className="flex flex-row items-center gap-4 font-light text-neutral-500">
					<div>{guestCount} guests</div>
					<div>{roomCount} rooms</div>
					<div>{bathroomCount} bathrooms</div>
				</div>
			</div>
			<hr />
			{category && <ListingCategory {...{ category }} />}
			<hr />
			<div className="text-lg font-light text-neutral-500">{description}</div>
			{coords && <Map center={coords} zoom={8} />}
		</div>
	);
};	

export default ListingInfo;

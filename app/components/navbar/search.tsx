"use client";
import React, { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import useSeachModal from "@/app/hooks/useSearchModal";
import useCountries from "@/app/hooks/useCountries";
import { useSearchParams } from "next/navigation";
import { format, differenceInDays } from "date-fns";

const Search: React.FC = () => {
	const searchModal = useSeachModal();
	const searchParams = useSearchParams();
	const { getByValue } = useCountries();
	const locationValue = searchParams.get("locationValue");
	const startDate = searchParams.get("startDate");
	const endDate = searchParams.get("endDate");
	const guestCount = searchParams.get("guestCount");
	const locationLabel = useMemo(() => {
		if (locationValue) return getByValue(locationValue as string)?.label;
		return "anywhere";
	}, [getByValue, locationValue]);
	const durationLable = useMemo(() => {
		if (startDate && endDate) {
			const start = new Date(startDate as string);
			const end = new Date(endDate as string);
			const days = differenceInDays(end, start);
			return `${format(start, "PP")} - ${format(end, "PP")} (${days || 1} days)`;
		}
		return "any week";
	}, [startDate, endDate]);
	const guestCountLabel = useMemo(() => {
		if (guestCount) return `${guestCount} guests`;
		return "add guests";
	}, [guestCount]);
	return (
		<div data-testid="search" className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
			<div className="flex flex-row items-center justify-between">
				<div className="text-sm font-semibold px-6">{locationLabel}</div>
				<div className="hidden sm:block text-sm font-semibold px-6 h-full border-[1px] flex-1 text-center">{durationLable}</div>
				<div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
					<div className="hidden sm:block">{guestCountLabel}</div>
				</div>
				<div onClick={searchModal.onOpen} className="p-2 bg-rose-600 rounded-full text-white mx-2">
					<BiSearch size={18} />
				</div>
			</div>
		</div>
	);
};

export default Search;

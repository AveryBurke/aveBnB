"use client";
import React from "react";
import { BiSearch } from "react-icons/bi";
import useSeachModal from "@/app/hooks/useSearchModal";

const search:React.FC = () => {
	const searchModal = useSeachModal();
	return (
		<div data-testid="search" className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
			<div className="flex flex-row items-center justify-between">
				<div className="text-sm font-semibold px-6">anywhere</div>
				<div className="hidden sm:block text-sm font-semibold px-6 h-full border-[1px] flex-1 text-center">any week</div>
				<div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
					<div className="hidden sm:block">add guests</div>
				</div>
				<div onClick={searchModal.onOpen} className="p-2 bg-rose-600 rounded-full text-white mx-2">
					<BiSearch size={18} />
				</div>
			</div>
		</div>
	);
};

export default search;

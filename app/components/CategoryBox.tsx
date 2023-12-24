"use client";
import React, { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
	icon: IconType;
	label: string;
	selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ icon: Icon, label, selected }) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const hanldeClick = useCallback(() => {
		let currentQuery = {};
		if (searchParams) currentQuery = qs.parse(searchParams.toString());
		const updatedQueryParams: any = {
			...currentQuery,
			category: label,
		};
		if (searchParams.get("category") === label) delete updatedQueryParams.category;

		const url = qs.stringifyUrl(
			{
				url: "/",
				query: updatedQueryParams,
			},
			{ skipNull: true }
		);

		router.push(url);
	}, [label, searchParams, router]);

	return (
		<div
			onClick={hanldeClick}
			className={
				"flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer " +
				(selected ? "border-b-neutral-800 text-neutral-800" : "border-transparent text-neutral-500")
			}>
			<Icon size={26} />
			<div className="font-medium text-sm">{label}</div>
		</div>
	);
};

export default CategoryBox;

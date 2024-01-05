"use client";
import React from "react";
import Select from "react-select";
import useContries from "@/app/hooks/useContries";

interface CountrySelectProps {
	value?: FormatedCountry;
	onChange: (Value: FormatedCountry) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
	const { getAll, getByValue } = useContries();
	return (
		<Select
			placeholder="anywhere"
			isClearable
			options={getAll()}
			value={value}
			onChange={(value) => onChange(value as FormatedCountry)}
			formatOptionLabel={(option: FormatedCountry) => (
				<div className="flex flex-row items-center gap-3">
					<div>{option.flag}</div>
					<div>
						{option.label}, <span className=" text-neutral-500 ml-1">{option.region}</span>
					</div>
				</div>
			)}
			classNames={{
				control: () => "p-3 border-2",
				input: () => "text-lg",
				option: () => "text-lg",
			}}
			theme={(theme) => ({
				...theme,
				borderRadius: 6,
				colors: {
					...theme.colors,
					primary: "black",
					primary25: "#ffe4e6",
				},
			})}
		/>
	);
};

export default CountrySelect;

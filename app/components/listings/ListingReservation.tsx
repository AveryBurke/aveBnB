import React from "react";
import { Range, RangeKeyDict } from "react-date-range";
import Calendar from "../inputs/Calendar";
import Button from "../Button";

interface ListingReservationProps {
	price: number;
	totalPrice: number;
	onChangeDate: (value: Range) => void;
	dateRange: Range;
	onSubmit: () => void;
	disabled: boolean;
	disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({ price, totalPrice, onChangeDate, dateRange, onSubmit, disabled, disabledDates }) => {
	return (
		<div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
			<div className="flex flex-row items-start gap-1 p-4">
				<div className=" text-2xl font-semibold">$ {price}</div>
				<div className="font-light text-neutral-600">night</div>
			</div>
			<hr />
			<Calendar {...{ dateRange, disabledDates, onChange: (value: RangeKeyDict) => onChangeDate(value.selection) }} />
			<hr />
			<div className="p-2">
				<Button {...{ disabled, label: "Reserve", onClick: onSubmit }} />
			</div>
			<div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
				<div>total</div>
				<div>$ {totalPrice}</div>
			</div>
		</div>
	);
};

export default ListingReservation;

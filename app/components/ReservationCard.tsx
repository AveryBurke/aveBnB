import React, { useMemo, useEffect, useState } from "react";
import { format, differenceInDays } from "date-fns";
import getUserInfo from "@/app/actions/getUserInfo";

interface ReservationCardProps {
	reservation: UiReservation;
	onClick: (id: string) => void;
	selected?: boolean;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
	reservation: { userId, totalPrice, createdAt, startDate, endDate, id },
	onClick,
	selected = false,
}) => {

    const [userName, setUserName] = useState<string>("Unknown user");

    useEffect(() => {
        getUserInfo(userId).then((user) => {
            console.log("user", user);
            setUserName(user?.name || "Unknown user");
        });
    }, [userId]);
    
	const durationLable = useMemo(() => {
		const start = new Date(startDate as string);
		const end = new Date(endDate as string);
		const days = differenceInDays(end, start);
		return `${format(start, "PP")} - ${format(end, "PP")} (${days || 1} days)`;
	}, [startDate, endDate]);

	const userLabel = useMemo(() => {
		return "Reserved by " + userName;
	}, [userName]);

	const createdAtLabel = useMemo(() => {
		return format(new Date(createdAt), "PP");
	}, [createdAt]);

	return (
		<div
			onClick={() => onClick(id)}
			className={
				"flex flex-col rounded-xl border-2 hover:border-black p-4 cursor-pointer gap-3 transition " + (selected ? "border-black" : "border-neutral-200")
			}>
			<div className="flex flex-col gap-2 w-full">
				<div className="font-semibold text-lg]">{userLabel}</div>
				<div className="font-semibold text-sm">{durationLable}</div>
				<div className="font-semibold text-sm">${totalPrice}</div>
				<div className="font-semibold text-sm">created on {createdAtLabel}</div>
			</div>
		</div>
	);
};

export default ReservationCard;

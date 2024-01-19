"use client";
import Modal from "./Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import Heading from "./Heading";
import React, { useState, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import queryString from "query-string";
import { formatISO } from "date-fns";
import CountrySelect from "../inputs/CountrySelect";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

enum STEPS {
	LOCATION,
	DATE,
	INFO,
	__LENGTH,
}

const SearchModal = () => {
	const { isOpen, onClose, onOpen } = useSearchModal();
	const router = useRouter();
	const searchParams = useSearchParams();

	const [step, setStep] = useState<STEPS>(STEPS.LOCATION);
	const [location, setLocation] = useState<FormatedCountry>();
	const [guestCount, setGuestCount] = useState(1);
	const [roomCount, setRoomCount] = useState(1);
	const [bathroomCount, setBathroomCount] = useState(1);
	const [dateRange, setdateRange] = useState<Range>({ startDate: new Date(), endDate: new Date(), key: "selection" });

	const Map = useMemo(() => dynamic(() => import("../Map"), { ssr: false }), [location]);

	const onBack = useCallback(() => {
		setStep((current) => (((current - 1) % STEPS.__LENGTH) + STEPS.__LENGTH) % STEPS.__LENGTH);
	}, []);
	const onNext = useCallback(() => {
		setStep((current) => (current + 1) % STEPS.__LENGTH);
	}, []);

	const onSubmit = useCallback(async () => {
		if (step !== STEPS.__LENGTH - 1) return onNext();

		let currentQuery = {};
		if (searchParams) {
			currentQuery = queryString.parse(searchParams.toString());
		}
		const updatedQuery: any = {
			...currentQuery,
			guestCount,
			bathroomCount,
			roomCount,
			locationValue: location?.value,
		};
		if (dateRange.startDate) {
			updatedQuery.startDate = formatISO(dateRange.startDate);
		}
		if (dateRange.endDate) {
			updatedQuery.endDate = formatISO(dateRange.endDate);
		}
		const url = queryString.stringifyUrl(
			{
				url: "/",
				query: updatedQuery,
			},
			{ skipNull: true }
		);
		console.log({ url });
		setStep(0);
		onClose();
		router.push(url);
	}, [step, roomCount, bathroomCount, guestCount, router, location, dateRange, searchParams, onNext]);

	const actionLabel = useMemo(() => (step === STEPS.__LENGTH - 1 ? "Search" : "Next"), [step]);
	const secondaryActionLabel = useMemo(() => (step > 0 ? "Back" : ""), [step]);

	let body: JSX.Element = <></>;

	switch (step) {
		case STEPS.LOCATION:
			body = (
				<div className="flex flex-col gap-8">
					<Heading title="Where would you like to go?" subtitle="Find the perfect location!" />
					<CountrySelect value={location} onChange={(value) => setLocation(value)} />
					<hr />
					<Map center={location ? location.latlang : [51.505, -0.09]} zoom={location ? 4 : 2} />
				</div>
			);
			break;
		case STEPS.DATE:
			body = (
				<div className="flex flex-col gap-8">
					<Heading title="When do you plan to go?" subtitle="Make sure everyone is free!" />
					<Calendar
						{...{
							dateRange,
							onChange: (value) => {
								setdateRange(value.selection);
							},
						}}
					/>
				</div>
			);
			break;
		case STEPS.INFO:
			body = (
				<div className="flex flex-col gap-8">
					<Heading title="When do you plan to go?" subtitle="Make sure everyone is free!" />
					<Counter title="Guests" subtitle="how many guests do you want to bring?" value={guestCount} onChange={(value) => setGuestCount(value)} />
					<hr />
					<Counter title="Rooms" subtitle="how many rooms do you need?" value={roomCount} onChange={(value) => setRoomCount(value)} />
					<hr />
					<Counter title="Bathrooms" subtitle="how many bathrooms do you need?" value={bathroomCount} onChange={(value) => setBathroomCount(value)} />
				</div>
			);
			break;
		default:
			break;
	}

	return <Modal {...{ isOpen: !!isOpen, onClose, onSubmit, body, actionLabel, secondaryActionLabel, secondaryAction: onBack, title: "Filters" }} />;
};

export default SearchModal;

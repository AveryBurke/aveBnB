"use client";
import React, { useState, useMemo } from "react";
import Heading from "./Heading";
import CountrySelect from "../inputs/CountrySelect";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import useRentModal from "@/app/hooks/useRentModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import dynamic from "next/dynamic";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
	CATEGORY,
	LOCATION,
	INFO,
	IMAGES,
	DESCRIPTION,
	PRICE,
	__LENGTH,
}

const RentModal = () => {
	const {
		register,
		watch,
		handleSubmit,
		setValue,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			title: "",
			description: "",
			imageSrc: "",
			category: null,
			roomCount: 1,
			bathroomCount: 0,
			guestCount: 1,
			locationValue: "",
			price: 1,
		},
	});

	const category = watch("category");
	const location: FormatedCountry = watch("locationValue");
	const price: number = watch("price");
	const roomCount: number = watch("roomCount");
	const bathroomCount: number = watch("bathroomCount");
	const guestCount: number = watch("guestCount");
	const img = watch("imageSrc");

	//Map is not supported in React, so it has to be dynamically reimported every time location changes
	const Map = useMemo(() => dynamic(() => import("../Map"), { ssr: false }), [location]);

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		});
	};
	const rentModal = useRentModal();
	const rounter = useRouter();
	const [step, setStep] = useState(STEPS.CATEGORY);
	const [isLoading, setIsLoading] = useState(false);

	const onBack = () => {
		setStep((current) => (((current - 1) % STEPS.__LENGTH) + STEPS.__LENGTH) % STEPS.__LENGTH);
	};
	const onNext = () => {
		setStep((current) => (current + 1) % STEPS.__LENGTH);
	};
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		if (step !== STEPS.__LENGTH - 1) return onNext();

		setIsLoading(true);
		axios
			.post("/api/listings", data)
			.then(() => {
				toast.success("Listing Created!");
				rounter.refresh();
				reset();
				setStep(0);
				rentModal.onClose();
			})
			.catch(() => toast.error)
			.finally(() => setIsLoading(false));
	};

	let body: JSX.Element;

	switch (step) {
		case STEPS.CATEGORY:
			{
				body = (
					<div className="flex flex-col gap-8">
						<Heading title="which of these best describes your place?" subtitle="Pick a category" center />
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
							{categories.map((cat, i) => {
								return (
									<CategoryInput
										key={`${cat.location}_${i}`}
										icon={cat.icon}
										label={cat.location}
										onClick={(category) => setCustomValue("category", category)}
										selected={category === cat.location}
									/>
								);
							})}
						</div>
					</div>
				);
			}
			break;

		case STEPS.DESCRIPTION:
			{
				body = (
					<div className="flex flex-col gap-8">
						<Heading title="How would you describe your place?" />
						<Input id="title" label="Title" disabled={isLoading} register={register} errors={errors} required />
						<Input id="description" label="Description" disabled={isLoading} register={register} errors={errors} required />
					</div>
				);
			}
			break;
		case STEPS.INFO:
			{
				body = (
					<div className="flex flex-col gap-8">
						<Heading title="Tell us more about your place" subtitle="Strangers want to know more!" />
						<Counter
							title="Rooms"
							subtitle="how many rooms does it have?"
							value={roomCount}
							onChange={(cRoomCount) => setCustomValue("roomCount", cRoomCount)}
						/>
						<hr />
						<Counter
							title="Bathrooms"
							subtitle="how many bathrooms does it have?"
							value={bathroomCount}
							onChange={(cBathroomCount) => setCustomValue("bathroomCount", cBathroomCount)}
						/>
						<hr />
						<Counter
							title="Guests"
							subtitle="How many guests do you allow?"
							value={guestCount}
							onChange={(cGuestCount) => setCustomValue("guestCount", cGuestCount)}
						/>
					</div>
				);
			}
			break;
		case STEPS.LOCATION:
			{
				body = (
					<div className="flex flex-col gap-8">
						<Heading title="Where is your place located?" subtitle="Strangers want to know!" />
						<CountrySelect value={location} onChange={(value) => setCustomValue("locationValue", value)} />
						<Map center={location ? location.latlang : [51.505, -0.09]} zoom={location ? 4 : 2} />
					</div>
				);
			}
			break;
		case STEPS.PRICE:
			{
				body = (
					<div className="flex flex-col gap-8">
						<Heading title="Name your price!" subtitle="How much do you charge per-night?" />
						<Input id="price" type="number" label="Price" formatPrice disabled={isLoading} errors={errors} register={register} required />
					</div>
				);
			}
			break;
		case STEPS.IMAGES:
			{
				body = (
					<div className="flex flex-col gap-8">
						<Heading title="What does your place look like?" subtitle="Help strangers spy on you!" />
						<ImageUpload value={img} onChange={(cImage) => setCustomValue("imageSrc", cImage)} />
					</div>
				);
			}

			break;
		default:
			body = <></>;
			break;
	}

	const actionLabel = useMemo(() => {
		if (step === STEPS.__LENGTH - 1) return "Create";
		return "Next";
	}, [step]);

	const secondayActionLable = useMemo(() => {
		if (step > 0) return "Back";
	}, [step]);

	return (
		<Modal
			disabled={isLoading}
			isOpen={rentModal.isOpen}
			title="Let Strangers Into You Home!"
			actionLabel={actionLabel}
			secondaryActionLabel={secondayActionLable}
			secondaryAction={step > 0 ? onBack : () => {}}
			onClose={rentModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={body}
		/>
	);
};

export default RentModal;

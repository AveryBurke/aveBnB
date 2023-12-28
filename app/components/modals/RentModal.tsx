"use client";
import React, { useState, useMemo } from "react";
import Heading from "./Heading";
import CountrySelect from "../inputs/CountrySelect";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import useRentModal from "@/app/hooks/useRentModal";
import { FieldValues, useForm } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Modal from "./Modal";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

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
	const router = useRouter();
	const {
		register,
		watch,
		handleSubmit,
		setValue,
		formState: { errors },
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
			price: 0,
		},
	});
	const category = watch("category");
	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		});
	};
	const rentModal = useRentModal();
	const [step, setStep] = useState(STEPS.CATEGORY);
	const onBack = () => {
		setStep((current) => (((current - 1) % STEPS.__LENGTH) + STEPS.__LENGTH) % STEPS.__LENGTH);
	};
	const onNext = () => {
		setStep((current) => (current + 1) % STEPS.__LENGTH);
	};
	const [isLoading, setIsLoading] = useState(false);
	let body: JSX.Element;

	switch (step) {
		case STEPS.CATEGORY:
			{
				body = (
					<div className="flex flex-col gap-8">
						<Heading title="which of these best describes your place?" subtitle="Pick a category" center></Heading>
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
				body = <div>description step</div>;
			}
			break;
		case STEPS.INFO:
			{
				body = <div>inof step</div>;
			}
			break;
		case STEPS.LOCATION:
			{
				body = (
					<div className="flex flex-col gap-8">
						<Heading title="Where is your place located?" subtitle="Strangers want to know!"></Heading>
						<CountrySelect onChange={(value:FormatedCountry) => console.log(value)}/>
					</div>
				);
			}
			break;
		case STEPS.PRICE:
			{
				body = <div>Price step</div>;
			}
			break;
		case STEPS.IMAGES:
			{
				body = <div>add images</div>;
			}

			break;
		default:
			body = <></>;
			break;
	}

	// const footer = (
	// 	<div className="flex flex-col gap-2">
	// 		<Button label="continue with google" onClick={() => signIn("google")} outline disapbled={isLoading} icon={FcGoogle} />
	// 		<Button label="continue with github" onClick={() => signIn("github")} outline disapbled={isLoading} icon={AiFillGithub} />
	// 		<span className=" font-light text-sm text-neutral-400">
	// 			first time here?{" "}
	// 			<span
	// 				onClick={() => {
	// 					rentModal.onClose();
	// 					rentModal.onOpen();
	// 				}}
	// 				className="font-semibold hover:underline cursor-pointer">
	// 				sign up
	// 			</span>
	// 		</span>
	// 	</div>
	// );

	const actionLabel = useMemo(() => {
		if (step === STEPS.__LENGTH - 1) return "Create";
		return "Next";
	}, [step]);

	const secondayActionLable = useMemo(() => {
		if (step > 0) return "Back";
	}, [step]);

	return (
		<Modal
			disapbled={isLoading}
			isOpen={rentModal.isOpen}
			title="Let Strangers Into You Home!"
			actionLabel={actionLabel}
			secondaryActionLabel={secondayActionLable}
			secondaryAction={step > 0 ? onBack : () => {}}
			onClose={rentModal.onClose}
			onSubmit={step === STEPS.__LENGTH - 1 ? rentModal.onClose : onNext}
			body={body}
			// footer={footer}
		/>
	);
};

export default RentModal;

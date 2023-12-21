"use client";
import React, { useState } from "react";
import Heading from "./Heading";
import useRegistarModal from "../../hooks/useRegistarModal";
import Input from "../inputs/Input";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Button from "../Button";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegistarModal = () => {
	const registarModal = useRegistarModal();
	const loginModal = useLoginModal();
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);
		axios
			.post("/api/register", data)
			.then(() => {
				toast.success("Account created!");
				registarModal.onClose();
			})
			.catch((error) => toast.error(error))
			.finally(() => setIsLoading(false));
	};

	const body = (
		<div className="flex flex-col gap-2">
			<Heading title="welcome to AveBnB" subtitle="create an account" center></Heading>
			<Input label="email" id="email" register={register} errors={errors} />
			<Input label="name" id="name" register={register} errors={errors} />
			<Input label="password" id="password" register={register} errors={errors} />
		</div>
	);

	const footer = (
		<div className="flex flex-col gap-2">
			<Button label="continue with google" onClick={() => signIn("google")} outline disapbled={isLoading} icon={FcGoogle} />
			<Button label="continue with github" onClick={() => signIn("github")} outline disapbled={isLoading} icon={AiFillGithub} />
			<span className=" font-light text-sm text-neutral-400">
				already have an account?{" "}
				<span
					onClick={() => {
						registarModal.onClose();
						loginModal.onOpen();
					}}
					className="font-semibold hover:underline cursor-pointer">
					login
				</span>
			</span>
		</div>
	);

	return (
		<Modal
			disapbled={isLoading}
			isOpen={registarModal.isOpen}
			title="register"
			actionLabel="continue"
			onClose={registarModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={body}
			footer={footer}
		/>
	);
};

export default RegistarModal;

"use client";
import React, { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import Heading from "./Heading";
import useLoginModal from "@/app/hooks/useLoginModal";
import Input from "../inputs/Input";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Button from "../Button";
import { useRouter } from "next/navigation";

const LoginModal = () => {
	const router = useRouter();
	const loginModal = useLoginModal();
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		console.log({data})
		setIsLoading(true);
		signIn("credentials", { ...data, redirect: false }).then((callback) => {
			if (callback?.ok) {
				//toast. I don't like toast
				router.refresh();
				loginModal.onClose();
			}
			if (callback?.error){
				//toast.error(callback.error)
			}
		});
	};

	const body = (
		<div className="flex flex-col gap-2">
			<Heading title="welcome back!" subtitle="log into your account" center></Heading>
			<Input label="email" id="email" register={register} errors={errors} />
			<Input label="password" id="password" register={register} errors={errors} />
		</div>
	);

	const footer = (
		<div className="flex flex-col gap-2">
			<Button label="continue with google" onClick={() => console.log("click")} outline disapbled={isLoading} icon={FcGoogle} />
			<Button label="continue with github" onClick={() => console.log("click")} outline disapbled={isLoading} icon={AiFillGithub} />
		</div>
	);

	return (
		<Modal
			disapbled={isLoading}
			isOpen={loginModal.isOpen}
			title="login"
			actionLabel="continue"
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={body}
			footer={footer}
		/>
	);
};

export default LoginModal;

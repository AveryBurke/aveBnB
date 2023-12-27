"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Heading from "./Heading";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegistarModal from "@/app/hooks/useRegistarModal";
import Input from "../inputs/Input";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const LoginModal = () => {
	const router = useRouter();
	const loginModal = useLoginModal();
	const registarModal = useRegistarModal();
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
		setIsLoading(true);
		signIn("credentials", { ...data, redirect: false }).then((callback) => {
			if (callback?.ok) {
				//I don't like toast
				toast.success("success!")
				router.refresh();
				loginModal.onClose();
			}
			if (callback?.error){
				toast.error(callback.error)
				setIsLoading(false);
			}
		});
	};

	const body = (
		<div className="flex flex-col gap-2">
			<Heading title="welcome back!" subtitle="log into your account" center></Heading>
			<Input label="email" id="email" register={register} errors={errors} />
			<Input label="password" id="password" register={register} errors={errors} type="password" />
		</div>
	);

	const footer = (
		<div className="flex flex-col gap-2">
			<Button label="continue with google" onClick={() => signIn("google")} outline disapbled={isLoading} icon={FcGoogle} />
			<Button label="continue with github" onClick={() => signIn("github")} outline disapbled={isLoading} icon={AiFillGithub} />
			<span className=" font-light text-sm text-neutral-400">
				first time here?{" "}
				<span
					onClick={() => {
						loginModal.onClose();
						registarModal.onOpen();
					}}
					className="font-semibold hover:underline cursor-pointer">
					sign up
				</span>
			</span>
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

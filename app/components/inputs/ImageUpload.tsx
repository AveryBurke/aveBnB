"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
	var cloudinary: any;
}

interface ImageUploadProps {
	onChange: (value: string) => void;
	value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
	const handleUpload = useCallback(
		(res: any) => {
			onChange(res.info.secure_url);
		},
		[onchange]
	);
	return (
		<CldUploadWidget onUpload={handleUpload} uploadPreset="dzaxdhcb" options={{ maxFiles: 1 }}>
			{({ open }) => {
				return (
					<div
						onClick={() => open?.()}
						className="
                            relative 
                            cursor-pointer 
                            hover:opacity-70 
                            transition 
                            border-dashed 
                            border-2 
                            p-20
                            border-neutral-300 
                            flex 
                            flex-col 
                            justify-center 
                            items-center
                            text-neutral-500
                ">
						<TbPhotoPlus size={50} />
						<div className="font-medium text-lg">Click to upload</div>
						{value && (
							<div className="absolute inset-0 w-full h-full">
								<Image alt="upload" src={value} style={{ objectFit: "cover" }} fill />
							</div>
						)}
					</div>
				);
			}}
		</CldUploadWidget>
	);
};

export default ImageUpload;

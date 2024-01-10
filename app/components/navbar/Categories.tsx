"use client"
import React from "react";
import Container from "../container";
import CategoryBox from "../CategoryBox";
import { FaDumpster, FaGhost, FaHouseFire, FaBiohazard } from "react-icons/fa6";
import { GiRadioTower, GiTank, GiBlackHoleBolas, GiUndergroundCave } from "react-icons/gi";
import { TbRadioactiveOff } from "react-icons/tb";
import { useSearchParams } from "next/navigation";
import { BsHousesFill } from "react-icons/bs";
import { SiHyperledger } from "react-icons/si";




export const categories: Category[] = [
    { 
        location: "Dump", 
        icon: FaDumpster, 
        description: "This property is within smelling distance of the dump!" 
    },
    {
        location: "Power Lines",
        icon: GiRadioTower,
        description: "This property is underneath power lines!"
    },
    {
        location: "Clean",
        icon: TbRadioactiveOff,
        description: "This property no longer contains nuclear waste!"
    },
    {
        location:"Haunted",
        icon: FaGhost,
        description: "This property is haunted!"
    },
    {
        location:"On Fire",
        icon: FaHouseFire,
        description: "This property is permanently on fire!"
    },
    {
        location:"Bigger On The Inside",
        icon: BsHousesFill,
        description: "This property is bigger on the inside than it is on the outside!"
    },
    {
        location: "Outbreak",
        icon: FaBiohazard,
        description: "This property has a an outbreak!"
    },
    {
        location: "non-Euclidean",
        icon: SiHyperledger,
        description: "This property has non-euclidean architecture!"
    },
    {
        location: "War Zone",
        icon: GiTank,
        description: "This property is located in a war zone!"
    },
    {
        location: "Parallel Universe",
        icon: GiBlackHoleBolas,
        description: "This property is in or near a parallel universe!"
    },
    {
        location: "Under Ground",
        icon: GiUndergroundCave,
        description: "This property is deep within the bowles of the earth. Where mortal men fear to tred!"
    }
];

const Categories = () => {
    const searchParams = useSearchParams();
    const category = searchParams.get("category");
	return (
		<Container>
			<div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((item, i) => <CategoryBox key = {`${item.location}_${i}`} label={item.location} icon={item.icon} selected={item.location === category}/>)}
            </div>
		</Container>
	);
};

export default Categories;

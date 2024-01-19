import React from "react";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";
import EmptyState from "@/app/components/EmptyState";
import ListingsClient from "./ListingsClient";

const page = async () => {
	const currentUser = await getCurrentUser();
	if (!currentUser) return <EmptyState title="Unauthorized" subtitle="Please Login" />;
	const listings = await getListings({ userId: currentUser.id });
	if (listings.length === 0) return <EmptyState title="No properties found" subtitle="It looks you don't have any properties listed yet" />;
	return <ListingsClient {...{ listings, currentUser }} />;
};

export default page;

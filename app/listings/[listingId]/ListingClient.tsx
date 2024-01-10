"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { eachDayOfInterval, differenceInCalendarDays } from "date-fns";
import { categories } from "@/app/components/navbar/Categories";
import { Reservation } from "@prisma/client";
import Container from "@/app/components/container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";

interface ListingClientProps {
	reservations?: Reservation[];
	listing: UiListingWithUiUser;
	currentUser?: UiUser | null;
}

const initialDateRange: Range = {
	startDate: new Date(),
	endDate: new Date(),
	key: "selection",
};

const ListingClient: React.FC<ListingClientProps> = ({ reservations = [], listing, currentUser }) => {
	const category = useMemo(() => {
		return categories.find((category) => category.location === listing.category);
	}, [listing.category]);
	const { title, imageSrc, locationValue, id: listingId, roomCount, bathroomCount, description, guestCount, user } = listing;

	const loginModal = useLoginModal();
	const router = useRouter();
	const disabledDates = useMemo(() => {
		let dates: Date[] = [];

		reservations.forEach((reservation) => {
			const range = eachDayOfInterval({
				start: new Date(reservation.startDate),
				end: new Date(reservation.endDate),
			});
			dates = [...dates, ...range];
		});
		return dates;
	}, [reservations]);

	const [isLoading, setIsLoading] = useState(false);
	const [totalPrice, setTotalPrice] = useState(listing.price);
	const [dateRange, setDateRange] = useState<Range>(initialDateRange);

	const onCreateReservation = useCallback(() => {
		if (!currentUser) return loginModal.onOpen();
		setIsLoading(true);
		fetch(`${process.env.NEXT_PUBLIC_BASE_URL}\api\reservations`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...dateRange, listingId: listing.id }),
		})
			.then(() => {
				toast.success("Success!");
				setDateRange(initialDateRange);
				// redirect to /trips
				router.push("/");
			})
			.catch(() => toast.error("Something went wrong"))
			.finally(() => setIsLoading(false));
	}, [totalPrice, dateRange, listing.id, router, currentUser, loginModal]);

	useEffect(() => {
		if (dateRange.startDate && dateRange.endDate && listing.price) {
			const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);
			setTotalPrice(dayCount * listing.price);
		} else {
			setTotalPrice(listing.price || 0);
		}
	}, [dateRange, listing.price]);

	return (
		<Container>
			<div className="max-w-screen-lg mx-auto">
				<div className="flex flex-col gap-6">
					<ListingHead {...{ title, imageSrc, locationValue, listingId, currentUser }} />
					<div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
						<ListingInfo {...{ roomCount, bathroomCount, description, guestCount, user, category, locationValue }} />
						<div className="order-first mb-10 md:order-last md:col-span-3">
							<ListingReservation
								{...{
									price: listing.price,
									totalPrice,
									onChangeDate: (value: Range) => setDateRange(value),
									dateRange,
									onSubmit: onCreateReservation,
									disabled: isLoading,
									disabledDates,
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default ListingClient;

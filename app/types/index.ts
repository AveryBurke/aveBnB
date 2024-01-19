import { User, Listing, Reservation } from "@prisma/client";
import { IconType } from "react-icons";

/** utility types */

/** changes the type of a field in an object or interface from one type to another */
type MapThisToThat<PropType, From, To> = PropType extends From ? To : PropType;

/** changes all fields in an object type or an interfeace from one type to another */
type MapDbObject<PT, From, To> = {
	[PropertyKey in keyof PT]: MapThisToThat<PT[PropertyKey], From, To>;
};

declare global {
	/** Ui safe User type. All Date types are swapped with string types */
	type UiUser = MapDbObject<User, Date, string>;

	/** Ui safe Listing type. All Date types are swapped with string types */
	type UiListing = MapDbObject<Listing, Date, string>;

	/** Ui safe Reservation type. All Date types are swapped with string types */
	type UiReservation = MapDbObject<Reservation, Date, string>;

	type FormatedCountry = {
		value: string;
		label: string;
		flag: string;
		latlang: [number, number];
		region: string;
	};

	type Category = {
		location: string;
		icon: IconType;
		description: string;
	};

	enum IParamTag {
		listingId,
		userId,
		authorId,
	}

	interface TaggedIParam<Tag extends IParamTag, V> {
		tag: Tag;
		value: V;
	}

	interface IParams {
		listingId?: string;
	}

	interface IListingParams {
		userId?: string;
		guestCount?: number
		bathroomCount?: number,
		roomCount?: number,
		locationValue?: string,
		startDate?: string,
		endDate?: string,
		category?: string
	}

	type IDiscriminatedUnion = TaggedIParam<IParamTag.listingId, string> | TaggedIParam<IParamTag.authorId, string> | TaggedIParam<IParamTag.userId, string>;

	interface UiListingWithUiUser extends UiListing {
		user: UiUser;
	}

	interface UiReservationWithUiListing extends UiReservation {
		listing: UiListing;
	}
}

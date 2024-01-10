import { User, Listing } from "@prisma/client";
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

	interface IParams {
		listingId?: string;
	}

	interface UiListingWithUiUser extends UiListing {
		user: UiUser;
	}
}

import { User } from "@prisma/client";

/** utility types */

/** changes the type of a field in an object or interface from one type to another */
type MapThisToThat<PropType, From, To> = PropType extends From ? To : PropType;

/** changes all fields in an object type or an interfeace from one type to another */
type MapDbObject<PT, From, To> = {
	[PropertyKey in keyof PT]: MapThisToThat<PT[PropertyKey], From, To>;
};

declare global {
	/** Ui safe user type. All Date types are swapped with string types are strings */
	type UiUser = MapDbObject<User, Date, string>;

	type FormatedCountry = {
		value: string;
		label: string;
		flag: string;
		latlang: [number, number];
		region: string;
	};
}

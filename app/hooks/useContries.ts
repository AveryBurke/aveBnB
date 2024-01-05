import countries from "world-countries";

const formatedCountries = countries.map((country) => ({
	value: country.cca2,
	label: country.name.common,
	flag: country.flag,
	latlang: country.latlng,
	region: country.region,
}));

const atlantis: FormatedCountry = {
	value: "AA",
	label: "Atlantis",
	flag: "\u{1F41F}",
	latlang: [38.9, 25.2],
	region: "Europe",
};

const rlyeh: FormatedCountry = {
	value: "RY",
	label: "R'lyeh",
	flag: "𖤐",
	latlang: [-48.876667, -123.393333],
	region: "Nemo",
};

formatedCountries.push(atlantis, rlyeh);

const useCountries = () => {
	const getAll = () => formatedCountries;
	const getByValue = (value: string) => formatedCountries.find((country) => country.value === value);

	return { getAll, getByValue };
};

export default useCountries;

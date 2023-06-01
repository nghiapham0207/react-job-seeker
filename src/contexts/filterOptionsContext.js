import { createContext, useContext, useState } from "react";

const FilterOptionContext = createContext();

// create context for it to reset when enter search
const initLocationWorking = [
	{
		id: 1,
		label: "Hồ Chí Minh",
		ariaLabel: "hcm",
		value: "Hồ Chí Minh",
		checked: false,
	},
	{ id: 2, label: "Hà Nội", ariaLabel: "hn", value: "Hà Nội", checked: false },
	{
		id: 3,
		label: "Đà Nẵng",
		ariaLabel: "dn",
		value: "Đà Nẵng",
		checked: false,
	},
];

const initState = {
	locationWorkings: initLocationWorking,
	occupations: [],
	companies: [],
};

export function FilterOptionsProvider({ children }) {
	const [filterOptions, setFilterOptions] = useState(initState);
	return (
		<FilterOptionContext.Provider value={{ filterOptions, setFilterOptions }}>{children}</FilterOptionContext.Provider>
	);
}

export function useFilterOptions() {
	const context = useContext(FilterOptionContext);
	if (context) {
		return context;
	} else {
		throw new Error("Context is not found!");
	}
}

import { createContext, useContext, useState } from "react";

const initState = "";

const SearchInputContext = createContext(null);

export function SearchInputProvider({ children }) {
	const [searchInput, setSearchInput] = useState(initState);
	return <SearchInputContext.Provider value={{ searchInput, setSearchInput }}>{children}</SearchInputContext.Provider>;
}

export function useSearchInput() {
	const context = useContext(SearchInputContext);
	if (context) {
		return context;
	} else {
		throw new Error("Context is not found!");
	}
}

import { createContext, useContext, useEffect, useReducer } from "react";
import bookmarkedReducer from "../reducers/bookmarkedReducer";
import { SET_BOOKMARK } from "../reducers/actions";

const initState = [];

const BookmarkedContext = createContext();

export function BookmarkedProvider({ children }) {
	const [state, dispatch] = useReducer(bookmarkedReducer, initState);
	const setBookmarkedJobs = async () => {
		try {
		} catch (error) {}
		dispatch({
			type: SET_BOOKMARK,
		});
	};
	useEffect(() => {}, []);
	return <BookmarkedContext.Provider value={{ setBookmarkedJobs }}>{children}</BookmarkedContext.Provider>;
}

export function useBookmarked() {
	const context = useContext(BookmarkedContext);
	if (context) {
		return context;
	} else {
		throw new Error("Context is not found!");
	}
}

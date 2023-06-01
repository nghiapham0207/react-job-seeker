import { ADD_BOOKMARK, REMOVE_BOOKMARK, SET_BOOKMARK } from "./actions";

export default function bookmarkedReducer(state, action) {
	switch (action.type) {
		case SET_BOOKMARK:
			return [action.payload];
		case ADD_BOOKMARK:
			return [...state, action.payload];
		case REMOVE_BOOKMARK:
			return [];
		default:
			throw new Error("Action not found!");
	}
}

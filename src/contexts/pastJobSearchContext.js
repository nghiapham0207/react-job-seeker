import { createContext, useContext, useState } from "react";

// const initState = [
//   { label: "Tìm kiếm gần đây:", keyword: "Reactjs" },
//   { label: "Tìm kiếm gần đây:", keyword: "Marketing" },
//   { label: "Tìm kiếm gần đây:", keyword: "Test" }
// ]
const localValue = localStorage.getItem("pastJobSearch");
const initState = localValue !== "undefined" ? JSON.parse(localValue) : [];

// create action function
// function load(payload) {
//   return {
//     type: "load",
//     payload
//   }
// }

// if use reducer, put it here or create folder src/reducers
// function reducer(state, action) {
//   switch (action.type) {
//     case 'increment':
//       return { count: state.count + 1 };
//     default:
//       throw new Error();
//   }
// }

const PastJobSearchContext = createContext(null);

export function PastJobSearchProvider({ children }) {
	// const [pastJobSearch, dispatch] = useReducer(reducer, initState);
	const [pastJobSearch, setPastJobSearch] = useState(initState);
	// const [pastJobSearch, setPastJobSearch] = useImmer(initState);
	// useRef
	/*
    nên code các hàm action vào đây luôn các action sẽ gọi dispatch,
    nếu có nhiều provide thì có nhiều dispatch sẽ trùng tên,
    hoặc là phải đổi tên dispatch,
    hơn nữa nếu dispatch thì p import 2 thứ, còn code action vào đây chỉ cần
    import context này
  */
	const updatePastJobSearch = (newSearch) => {
		setPastJobSearch((prev) => {
			if (prev?.length >= 3) {
				return prev.filter((item, index) => index !== 0);
			} else {
				return prev;
			}
		});
		setPastJobSearch((prev) => {
			if (prev?.length) {
				return [...prev, newSearch];
			} else {
				return [newSearch];
			}
		});
		// }))
		// localStorage.setItem("pastJobSearch", JSON.stringify(pastJobSearch));
		// setPastJobSearch([...pastJobSearch, newArray]);
	};
	return (
		<PastJobSearchContext.Provider value={{ pastJobSearch, updatePastJobSearch }}>
			{children}
		</PastJobSearchContext.Provider>
	);
}

export function usePastJobSearch() {
	const context = useContext(PastJobSearchContext);
	if (!context) {
		throw new Error("Context is not found!");
	}
	return context;
}

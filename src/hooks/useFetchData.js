import { useEffect } from "react";

const { useState } = require("react");

function useGetData(url) {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {}, []);
	return data;
}

export default useGetData;

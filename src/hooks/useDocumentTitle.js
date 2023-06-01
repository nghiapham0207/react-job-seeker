import { useEffect } from "react";

function useDocumentTitle(title, toTop = false) {
	if (toTop) {
		window.scrollTo(0, 0);
	}
	useEffect(() => {
		document.title = title;
	}, [title]);
}

export default useDocumentTitle;

import { useDocumentTitle } from "../../hooks";
import Error from "../../components/Error";

function ErrorPage() {
	useDocumentTitle("Page Not Found");
	return (
		<>
			<Error />
		</>
	);
}

export default ErrorPage;

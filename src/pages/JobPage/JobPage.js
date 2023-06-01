import ExploreTab from "../../components/ExploreTab";
import { useDocumentTitle } from "../../hooks";

function JobPage() {
	useDocumentTitle("Tìm Việc Làm");
	return (
		<>
			<ExploreTab />
		</>
	);
}

export default JobPage;

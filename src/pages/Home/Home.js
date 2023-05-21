import GlintContainer from "../../components/GlintContainer/GlintContainer";
import SearchSection from "../../components/SearchSection/SearchSection";
import ValueProposition from '../../components/GlintContainer/ValueProposition';
import StatisticDisplay from "../../components/GlintContainer/StatisticDisplay/";
import CareersGrid from "../../components/GlintContainer/CareersGrid/";
import PressFeatures from "../../components/GlintContainer/PressFeatures/PressFeatures";
import Testimonial from "../../components/GlintContainer/Testimonial/Testimonial";
import { useDocumentTitle } from "../../hooks";

function Home() {
	// console.log("Render Home");
	useDocumentTitle("Glints - Kênh Tuyển Dụng", true);
	return (
		<div className="Landing">
			<SearchSection />
			<GlintContainer>
				<StatisticDisplay />
				<CareersGrid />
				<ValueProposition />
				<PressFeatures />
				<Testimonial />
			</GlintContainer>
		</div>
	)
}

export default Home;

import classNames from "classnames/bind";

import styles from "./SearchSection.module.scss";
import SearchContainer from "../SearchContainer/SearchContainer";
import GlintContainer from "../GlintContainer";

const cx = classNames.bind(styles);

function SearchSection() {
	return (
		<div className={cx("Search")}>
			<GlintContainer>
				<div className={cx("SearchWrapper")}>
					<h5 className={cx("SectionHeader")}>
						Khám phá <b>5000+</b> việc làm mới hàng tháng!
					</h5>
					<div className={cx("SectionSearchContainer")}>
						<div></div>
						<div className={cx("SearchField")}>
							<SearchContainer />
						</div>
					</div>
				</div>
			</GlintContainer>
		</div>
	);
}

export default SearchSection;

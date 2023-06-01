import classNames from "classnames/bind";
import { Fragment, memo } from "react";

import styles from "./JobList.module.scss";
import InfiniteScrollContainer from "../InfiniteScroll/InfiniteScrollContainer";
import JobCardContainer from "../JobCard/JobCardContainer";
import JobCardWrapper from "../JobCard/JobCardWrapper";

const cx = classNames.bind(styles);

function JobList({ jobList, isLoading, className }) {
	if (isLoading) {
		return (
			<div className={cx("Box__StyledBox", "Flex__StyledFlex", "Flex")}>
				<InfiniteScrollContainer size="3rem">Đang tải thêm công việc khác</InfiniteScrollContainer>
			</div>
		);
	}
	return (
		<div className={cx("CompactJobCardList__JobCardListContainer", "styles__CompactJobCardList", className)}>
			{jobList?.map((job, index) => {
				return (
					<Fragment key={job._id}>
						<JobCardContainer>
							<JobCardWrapper job={job} index={index} />
						</JobCardContainer>
					</Fragment>
				);
			})}
		</div>
	);
}

export default memo(JobList); // ok
// export default JobList;

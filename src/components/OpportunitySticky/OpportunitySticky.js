import classNames from "classnames/bind";
import { useContext } from "react";

import styles from "./OpportunitySticky.module.scss";
import { JobContext } from "../../pages/DetailJob";
import { SolidBtnContainer, SolidButton } from "../ButtonStyle";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function OpportunitySticky({ openModal }) {
	const job = useContext(JobContext);
	return (
		<div className={cx("OpportunityStickyContainer")}>
			<div className={cx("GlintContainer", "StyledGlintContainer")}>
				<div className={cx("FlexingContainer")}>
					<div className={cx("JobOverViewContainer")}>
						<div>
							<div className={cx("JobOverViewHeader")}>
								<p className={cx("JobOverViewTitle")}>{job.name}</p>
							</div>
							<div className={cx("BadgesAndCompanyInfoContainer")}>
								<div className={cx("JobOverViewCompanyInfo")}>
									<div className={cx("JobOverViewCompanyName")}>
										<Link to={`/company/${job.idCompany?._id}`}>{job?.idCompany?.name}</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={cx("StickyButtonContainer")}>
						<div className={cx("ApplyButton__ApplyButton")}>
							<SolidBtnContainer>
								<SolidButton disable={job.isApply ? true : false} onClick={openModal}>
									{job.isApply ? "Bạn đã ứng tuyển công việc này!" : "Ứng tuyển nhanh"}
								</SolidButton>
							</SolidBtnContainer>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default OpportunitySticky;

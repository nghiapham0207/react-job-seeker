import classNames from "classnames/bind";
import { useContext, useState } from "react";

import styles from "./OpportunitySticky.module.scss";
import { JobContext } from "../../pages/DetailJob";
import { SolidBtnContainer, SolidButton } from "../ButtonStyle";

const cx = classNames.bind(styles);

function OpportunitySticky({ openModal }) {
  const [showJobOverView, setShowJobOverView] = useState(true);
  const job = useContext(JobContext);
  return <div className={cx("OpportunityStickyContainer")}>
    <div className={cx("GlintContainer", "StyledGlintContainer")}>
      <div className={cx("FlexingContainer")}>
        {
          window.matchMedia("(min-width: 640px)").addEventListener("change", (e) => {
            if (e.matches) {
              setShowJobOverView(true);
            } else {
              setShowJobOverView(false);
            }
          })
        }
        {
          showJobOverView &&
          < div className={cx("JobOverViewContainer")}>
            <div>
              <div className={cx("JobOverViewHeader")}>
                <p className={cx("JobOverViewTitle")}>
                  {job.name}
                </p>
              </div>
              <div className={cx("BadgesAndCompanyInfoContainer")}>
                <div className={cx("JobOverViewCompanyInfo")}>
                  <div className={cx("JobOverViewCompanyName")}>
                    <a href="/company/sadsdas">{job?.idCompany?.name}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        <div className={cx("StickyButtonContainer")}>
          <div className={cx("ApplyButton__ApplyButton")}>
            {/* <div className={cx("ButtonStyle__SolidBtnContainer")}>
              <button type="button"
                className={cx("ButtonStyle__Button", "ButtonStyle__SolidBtn")}
                onClick={openModal} >
                Ứng tuyển nhanh
              </button>
            </div> */}
            <SolidBtnContainer>
              <SolidButton
                disable={job.isApply ? true : false}
                onClick={openModal} >
                {job.isApply ? "Bạn đã ứng tuyển công việc này!" : "Ứng tuyển nhanh"}
              </SolidButton>
            </SolidBtnContainer>
          </div>
        </div>
      </div>
    </div>
  </div >
}

export default OpportunitySticky;

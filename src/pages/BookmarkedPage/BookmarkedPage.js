import classNames from "classnames/bind";

import styles from "./BookmarkedPage.module.scss";
import EmptyTabView from "../../components/EmptyTabView/EmptyTabView";
import GlintContainer from "../../components/GlintContainer/GlintContainer";
import JobList from "../../components/JobList";
import { TabsContainer, TabsHeader } from "../../components/TabsStyle";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/selector";

const cx = classNames.bind(styles);

export default function BookmarkedPage() {
  const currentUser = useSelector(selectUser);
  console.log(currentUser);
  const savedJobs = currentUser.savedJobs.map((job) => ({ ...job.jobId }));
  console.log(savedJobs);
  return (
    <>
      <TabsContainer className={"styles__JobTabList"}>
        <TabsHeader className={"tabs-header"} />
      </TabsContainer>
      <GlintContainer className={cx("JobTabBody")}>
        {
          savedJobs.length > 0 ?
            <>
              <header>
                <h2 className={cx("Title")}>
                  Công việc đã lưu ({savedJobs.length})
                </h2>
              </header>
              <JobList jobList={savedJobs} className={cx("BookmarkJobCardList")} />
            </> :
            <EmptyTabView />
        }
      </GlintContainer>
    </>
  )
}
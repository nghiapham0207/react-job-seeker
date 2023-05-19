import classNames from "classnames/bind";

import styles from "./BookmarkedPage.module.scss";
import EmptyTabView from "../../components/EmptyTabView/EmptyTabView";
import GlintContainer from "../../components/GlintContainer/GlintContainer";
import JobList from "../../components/JobList";
import { TabsContainer, TabsHeader } from "../../components/TabsStyle";

const cx = classNames.bind(styles);

const initState = [
  {
    "_id": "64619c761cef603ce819cd06",
    "postingDate": "2023-05-15T17:00:00.000Z",
    "updateDate": "2023-05-15T02:44:06.468Z",
    "deadline": "2023-05-25T00:00:00.000Z",
    "status": true,
    "name": "Java Intern",
    "description": "<ul><li>Tham gia thiết kế database,...</li><li>Tham gia training core của platform</li></ul>",
    "requirement": "<p>Sinh viên năm 3, năm 4</p>",
    "hourWorking": "Fulltime",
    "salary": "Thỏa thuận",
    "locationWorking": "Q7, TP Hồ Chí Minh",
    "idOccupation": {
      "_id": "64100616fdd527b2f096944a",
      "name": "IT",
      "__v": 0,
      "isDelete": false
    },
    "idCompany": {
      "_id": "64619ae31cef603ce819ccf4",
      "isDelete": false,
      "name": "SCC",
      "totalEmployee": 300,
      "type": "software, outsource",
      "about": "startup company",
      "phone": "0653748823",
      "location": "Ho Chi Minh",
      "createDate": "2023-05-15T02:37:23.018Z",
      "idUser": "64624d3bd807d302ee3145b7",
      "__v": 0
    },
    "__v": 0
  },
  {
    "_id": "64619d7d1cef603ce819cd14",
    "postingDate": "2023-05-15T17:00:00.000Z",
    "updateDate": "2023-05-15T02:48:29.193Z",
    "deadline": "2023-05-27T00:00:00.000Z",
    "status": true,
    "name": "ReactJs Intern",
    "description": "<ul><li>Thiết kế giao diện</li><li>Học core </li></ul>",
    "requirement": "<p>Sinh viên năm cuối ngành Công nghệ thông tin</p>",
    "hourWorking": "Fulltime",
    "salary": "3000000 đồng",
    "locationWorking": "Q8 TP Hồ Chí Minh",
    "idOccupation": {
      "_id": "64100622fdd527b2f096944e",
      "name": "Front-end",
      "__v": 0,
      "isDelete": false
    },
    "idCompany": {
      "_id": "64619ae31cef603ce819ccf4",
      "isDelete": false,
      "name": "SCC",
      "totalEmployee": 300,
      "type": "software, outsource",
      "about": "startup company",
      "phone": "0653748823",
      "location": "Ho Chi Minh",
      "createDate": "2023-05-15T02:37:23.018Z",
      "idUser": "64624d3bd807d302ee3145b7",
      "__v": 0
    },
    "__v": 0
  }
]

export default function BookmarkedPage() {
  return (
    <>
      <TabsContainer className={"styles__JobTabList"}>
        <TabsHeader className={"tabs-header"} />
      </TabsContainer>
      <GlintContainer className={cx("JobTabBody")}>
        {
          true ?
            <>
              <header>
                <h2 className={cx("Title")}>
                  Công việc đã lưu ({initState.length})
                </h2>
              </header>
              <JobList jobList={initState} className={cx("BookmarkJobCardList")} />
            </> :
            <EmptyTabView />
        }
      </GlintContainer>
    </>
  )
}
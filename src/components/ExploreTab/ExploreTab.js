import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSliders } from "@fortawesome/free-solid-svg-icons";
import { Suspense, useDeferredValue, useEffect, useMemo, useRef, useState, useTransition } from "react";

import styles from "./ExploreTab.module.scss";
import GlintContainer from "../GlintContainer";
import { useDeferred } from "../../hooks";

import SearchContainer from "../SearchContainer";
import { path, post } from "../../utils/axiosAPI";
import JobList from "../JobList/JobList";
import {
  selectCompanies,
  selectFilter,
  selectLocationWorkings,
  selectOccupations,
  selectSearch
} from "../../redux/selector";
import TagContainer from "../TagStyle/TagContainer";
import TagContent from "../TagStyle/TagContent";

import { usePastJobSearch } from "../../contexts/pastJobSearchContext";
import FilterContainer from "./FilterContainer";
import InfiniteScrollContainer from "../InfiniteScroll/InfiniteScrollContainer";
import axios from "axios";
import { ModalBody, ModalContainer, ModalContentArea, ModalDialog, ModalHeader } from "../ModalStyle";

const cx = classNames.bind(styles);

function ExploreTab() {
  // console.log("Render ExploreTab");
  const modalRef = useRef();
  const PastJobSearchContext = usePastJobSearch();
  const { pastJobSearch } = PastJobSearchContext;
  const searchInput = useSelector(selectSearch);
  const occupationsFilter = useSelector(selectOccupations);
  const locationWorkingFilter = useSelector(selectLocationWorkings);
  const companiesFilter = useSelector(selectCompanies);
  const filter = useSelector(selectFilter);
  const [jobList, setJobList] = useState([]);
  const [isPending, startTransition] = useTransition();
  const filterDeferred = useDeferred(filter, 600);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      console.log("Call API");
      setIsLoading(true);
      // const dataFilter = {};
      // Object.entries(dataFilter).length === 0
      // dataFilter.key = searchInput;
      // // dataFilter.idCompany = 
      // dataFilter.idOccupation = occupationsFilter;
      // dataFilter.locationWorking = locationWorkingFilter;
      // if (occupationsFilter.length) {
      //   dataFilter.idOccupation = occupationsFilter;
      // }
      // if (locationWorkingFilter.length) {
      //   dataFilter.localWorking = locationWorkingFilter;
      // }
      const dataFilter = {
        key: searchInput,
        idOccupation: occupationsFilter,
        idCompany: companiesFilter,
        locationWorking: locationWorkingFilter,
      }
      // console.log(dataFilter);
      try {
        const res = await post(path.searchJob, dataFilter);
        // const res = await axios.get("https://jsonplaceholder.typicode.com/comments");
        // console.log(res);
        setIsLoading(false);
        startTransition(() => {
          setJobList(res.data);
        })
      } catch (error) {
        console.log(error);
      }
    }
    fetchJobs();
  }, [searchInput, filterDeferred]);

  return (
    <GlintContainer className={cx("styles__ExploreTabBody")}>
      {/* <GlintContainer className={cx("Body")}> */}
      <div className={cx("DesktopSearchBoxWrapper")}>
        <div className={cx("Box__StyledBox")}>
          <SearchContainer />
        </div>
      </div>
      <div className={cx("MobileStickySearchAndFilterContainer")}>
        <div className={cx("Box__StyledBox")}>
          <button type="button"
            onClick={() => {

            }}
            className={cx("UnstyleButton", "MobileFilterButton")}>
            <FontAwesomeIcon className="IconStyle__VerticalCenteredSvg" icon={faSliders} />
            <span>
              Bộ lọc
            </span>
          </button>
        </div>
      </div>
      {/* Tìm kiếm gần đây lưu ở local */}
      <div className={cx("styles__Container")}>
        {pastJobSearch?.map((element, index) => (
          <div key={index} className={cx("styles__ItemWrapper")}>
            <TagContainer keyword={element?.keyword}>
              <TagContent>
                <FontAwesomeIcon icon={faSearch} />
                <span className={cx("Style_SearchTypeLabel")}>{element?.label}</span>
                <span className={cx("styles__SearchKeywordLabel")}>{element?.keyword}</span>
              </TagContent>
            </TagContainer>
          </div>
        ))}
      </div>
      {/* end past job search */}
      <h1 className={cx("JobCount")}>
        {jobList.length} việc làm tại Vietnam
      </h1>
      <div className={cx("Body")}>
        {/* Modal Filter Here */}
        {/* <ModalContainer modalRef={modalRef}
          handleShowModal={() => {

          }} >
          <ModalDialog>
            <ModalContentArea modalRef={modalRef}>
              <ModalHeader handleShowModal={() => { }} />
              <ModalBody>
                <p>test</p>
                <FilterContainer />
              </ModalBody>
            </ModalContentArea>
          </ModalDialog>
        </ModalContainer> */}
        <FilterContainer />
        <div className={cx("Box__StyledBox", "Flex__StyledFlex", "Flex")}>
          {
            isLoading ?
              <InfiniteScrollContainer width="3rem" height="3rem">
                Đang tải thêm công việc khác
              </InfiniteScrollContainer> :
              <div className={cx("CompactJobCardList__JobCardListContainer",
                "styles__CompactJobCardList")}>
                <JobList jobList={jobList} />
              </div>
          }
          {isPending &&
            <InfiniteScrollContainer width="3rem" height="3rem">
              Đang tải thêm công việc khác
            </InfiniteScrollContainer>}

          <div className={cx("PaginationContainer")}></div>
        </div>
      </div>
    </GlintContainer>
  )
}
export default ExploreTab;

import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSliders } from "@fortawesome/free-solid-svg-icons";
import { Suspense, useDeferredValue, useEffect, useMemo, useRef, useState, useTransition } from "react";

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
import MobileFilter from "../MobileFilter/MobileFilter";
import styles from "./ExploreTab.module.scss";

const cx = classNames.bind(styles);

function ExploreTab() {
  // console.log("Render ExploreTab");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [showMobileFilterModal, setShowMobileFilterModal] = useState(false);
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

  const handleShowModal = () => {
    setShowMobileFilterModal(!showMobileFilterModal);
  }
  useEffect(() => {
    const fetchJobs = async () => {
      console.log("Call API");
      setIsLoading(true);
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

  useEffect(() => {
    const handleMediaChange = (e) => {
      if (e.matches) {
        setShowMobileFilter(false);
      } else {
        setShowMobileFilter(true);
      }
    }
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    mediaQuery.addEventListener("change", handleMediaChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    }
  }, [])
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
            onClick={handleShowModal}
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
        {
          showMobileFilter ?
            showMobileFilterModal && <MobileFilter modalRef={modalRef} handleShowModal={handleShowModal} /> :
            <FilterContainer />
        }
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

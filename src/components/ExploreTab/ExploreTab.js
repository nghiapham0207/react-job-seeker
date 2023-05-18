import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faCompass, faSearch, faSliders } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState, useTransition } from "react";

import GlintContainer from "../GlintContainer";
import { useDeferred } from "../../hooks";

import SearchContainer from "../SearchContainer";
import { get, path, post } from "../../utils/axiosAPI";
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
import MobileFilter from "../MobileFilter/MobileFilter";
import styles from "./ExploreTab.module.scss";
import { useFilterOptions } from "../../contexts/filterOptionsContext";
import TabsContainer from "../TabsStyle/TabsContainer";
import TabsHeader from "../TabsStyle/TabsHeader";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function ExploreTab() {
  console.log("render");
  // const [showMobileFilter, setShowMobileFilter] = useState(false);
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
  // console.log(filterDeferred);
  const { filterOptions, setFilterOptions } = useFilterOptions();

  useEffect(() => {
    const fetchOccupations = async () => {
      const [resOccupations, resCompanies] = await Promise.all([
        get(path.occupations),
        get(path.companies)
      ]);
      const newOccupations = resOccupations.data.data.map((occupation) => {
        return {
          id: occupation._id,
          label: occupation.name,
          ariaLabel: occupation._id,
          value: occupation._id,
          checked: false
        }
      })
      const newCompanies = resCompanies.data.data.map((occupation) => {
        return {
          id: occupation._id,
          label: occupation.name,
          ariaLabel: occupation._id,
          value: occupation._id,
          checked: false
        }
      })
      setFilterOptions((pre) => {
        return {
          ...pre,
          companies: newCompanies,
          occupations: newOccupations
        }
      })
    }
    fetchOccupations();
    // Not
  }, [setFilterOptions]);

  const handleShowModal = () => {
    console.log("it's just work with change viewport");
    setShowMobileFilterModal(!showMobileFilterModal);
  }
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      const dataFilter = {
        key: searchInput,
        idOccupation: occupationsFilter,
        idCompany: companiesFilter,
        locationWorking: locationWorkingFilter,
      }
      // const dataFilter = {
      //   key: searchInput,
      //   idOccupation: filterDeferred.occupations,
      //   idCompany: filterDeferred.companies,
      //   locationWorking: filterDeferred.locationWorking,
      // }
      console.log(filterDeferred);
      try {
        const res = await post(path.searchJob, dataFilter);
        setIsLoading(false);
        startTransition(() => {
          setJobList(res.data);
        })
      } catch (error) {
        console.log(error);
      }
      finally {
        setIsLoading(false);
      }
    }
    fetchJobs();
    // }, [searchInput, companiesFilter, locationWorkingFilter, occupationsFilter]);
    // eslint-disable-next-line
  }, [searchInput, filterDeferred]);
  return (
    <>
      <TabsContainer className={"styles__JobTabList"}>
        <TabsHeader className={"tabs-header"}>
          <ul className="tabs-list horizontal-tabs-list">
            <li className="horizontal-tab active">
              <Link>
                <FontAwesomeIcon className="IconStyle__VerticalCenteredSvg" icon={faCompass} />
                khám phá ngay
              </Link>
            </li>
            <li className="horizontal-tab">
              <Link>
                <FontAwesomeIcon className="IconStyle__VerticalCenteredSvg" icon={faBookmark} />
                đã lưu
              </Link>
            </li>
          </ul>
        </TabsHeader>
      </TabsContainer>
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
            // showMobileFilter ?
            showMobileFilterModal &&
            <div className="MobileFilterContainer">
              <MobileFilter modalRef={modalRef} handleShowModal={handleShowModal}
                locationWorkings={filterOptions.locationWorkings}
                companies={filterOptions.companies}
                occupations={filterOptions.occupations} />
            </div>
          }
          <FilterContainer
            locationWorkings={filterOptions.locationWorkings}
            companies={filterOptions.companies}
            occupations={filterOptions.occupations} />
          <div className={cx("Box__StyledBox", "Flex__StyledFlex", "Flex")}>
            <JobList jobList={jobList} isLoading={isLoading} />
            {isPending &&
              <InfiniteScrollContainer width="3rem" height="3rem">
                Đang tải thêm công việc khác
              </InfiniteScrollContainer>}
          </div>
        </div>
      </GlintContainer>
    </>
  )
}
export default ExploreTab;

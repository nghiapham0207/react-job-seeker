import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSliders } from "@fortawesome/free-solid-svg-icons";
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

const cx = classNames.bind(styles);

// const initJobList = [
//   {
//     "_id": "64168368eb7ad99a3466e6b9",
//     "deadline": "2024-12-30T17:00:00.000Z",
//     "status": true,
//     "name": "Lập trình viên back-end",
//     "description": "Tham gia thiết kế giao diện, ...",
//     "requirement": "C#, ASP.NET Core",
//     "hourWorking": "40hrs/week Monday to Friday",
//     "postingDate": "2023-02-05T17:00:00.000Z",
//     "salary": "20000000",
//     "locationWorking": "Hồ Chí Minh",
//     "idOccupation": {
//       "_id": "64100616fdd527b2f096944a",
//       "name": "IT",
//       "__v": 0,
//       "isDelete": false
//     },
//     "idCompany": {
//       "_id": "641003eafe045f194923dc8a",
//       "isDelete": false,
//       "name": "FPT Software",
//       "totalEmployee": 10000,
//       "type": "software, outsource",
//       "about": "top company about technology in Viet Nam",
//       "phone": "033947586",
//       "location": "Ho Chi Minh, Ha Noi",
//       "idUser": "6403449d78ddac861ce0b13d",
//       "__v": 0,
//       "createDate": "2023-04-17T19:38:37.669Z"
//     },
//     "__v": 0,
//     "updateDate": "2023-04-15T07:09:35.497Z"
//   },
//   {
//     "_id": "641683dfa8922acf0dfc7a8a",
//     "postingDate": "2023-03-19T00:00:00.000Z",
//     "deadline": "2024-12-30T17:00:00.000Z",
//     "status": true,
//     "name": "Lập trình viên front-end",
//     "description": "Tham gia thiết kế giao diện, ...",
//     "requirement": "HTML, CSS, JS, Angular",
//     "hourWorking": "40hrs/week Monday to Friday",
//     "salary": "15000000",
//     "locationWorking": "Hồ Chí Minh",
//     "idOccupation": {
//       "_id": "64100616fdd527b2f096944a",
//       "name": "IT",
//       "__v": 0,
//       "isDelete": false
//     },
//     "idCompany": {
//       "_id": "641003eafe045f194923dc8a",
//       "isDelete": false,
//       "name": "FPT Software",
//       "totalEmployee": 10000,
//       "type": "software, outsource",
//       "about": "top company about technology in Viet Nam",
//       "phone": "033947586",
//       "location": "Ho Chi Minh, Ha Noi",
//       "idUser": "6403449d78ddac861ce0b13d",
//       "__v": 0,
//       "createDate": "2023-04-17T19:38:37.669Z"
//     },
//     "__v": 0,
//     "updateDate": "2023-04-15T07:09:35.497Z"
//   },
//   {
//     "_id": "64168513a8922acf0dfc7a8e",
//     "postingDate": "2023-03-18T17:00:00.000Z",
//     "deadline": "2024-12-30T17:00:00.000Z",
//     "status": true,
//     "name": "Lập trình viên back-end Python",
//     "description": "Tham gia thiết kế giao diện, ...",
//     "requirement": "Django, Flask",
//     "hourWorking": "40hrs/week Monday to Friday",
//     "salary": "15000000",
//     "locationWorking": "Hồ Chí Minh",
//     "idOccupation": {
//       "_id": "64100616fdd527b2f096944a",
//       "name": "IT",
//       "__v": 0,
//       "isDelete": false
//     },
//     "idCompany": {
//       "_id": "641684bda8922acf0dfc7a8c",
//       "isDelete": false,
//       "name": "NCC",
//       "totalEmployee": 300,
//       "type": "software, outsource",
//       "about": "startup company",
//       "phone": "0653748823",
//       "location": "Ho Chi Minh",
//       "idUser": "63dfb79ce2b2004977bc1b07",
//       "__v": 0,
//       "createDate": "2023-04-17T19:38:37.669Z"
//     },
//     "__v": 0,
//     "updateDate": "2023-04-15T07:09:35.497Z"
//   },
//   {
//     "_id": "6427dd722c7b6260aa9860a9",
//     "postingDate": "2023-03-31T17:00:00.000Z",
//     "deadline": "2024-12-30T17:00:00.000Z",
//     "status": true,
//     "name": "Lập trình viên mobile Flutter",
//     "description": "Tham gia thiết kế giao diện, ...",
//     "requirement": "Flutter, Dart",
//     "hourWorking": "40hrs/week Monday to Friday",
//     "salary": "15000000",
//     "locationWorking": "Hà Nội",
//     "idOccupation": {
//       "_id": "64100616fdd527b2f096944a",
//       "name": "IT",
//       "__v": 0,
//       "isDelete": false
//     },
//     "idCompany": {
//       "_id": "641684bda8922acf0dfc7a8c",
//       "isDelete": false,
//       "name": "NCC",
//       "totalEmployee": 300,
//       "type": "software, outsource",
//       "about": "startup company",
//       "phone": "0653748823",
//       "location": "Ho Chi Minh",
//       "idUser": "63dfb79ce2b2004977bc1b07",
//       "__v": 0,
//       "createDate": "2023-04-17T19:38:37.669Z"
//     },
//     "__v": 0,
//     "updateDate": "2023-04-15T07:09:35.497Z"
//   },
// ]

function ExploreTab() {
  // console.log("Render ExploreTab");
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

  const FilterOptionContext = useFilterOptions();
  const { filterOptions, setFilterOptions } = FilterOptionContext;

  useEffect(() => {
    const fetchOccupations = async () => {
      const [resOccupations, resCompanies] = await Promise.all([
        get(path.occupations),
        get(path.companies)
      ]);
      // const resOccupations = await get(path.occupations);
      // console.log(resOccupations);
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
    // eslint-disable-next-line
  }, []);

  const handleShowModal = () => {
    console.log("it's just work with change viewport");
    setShowMobileFilterModal(!showMobileFilterModal);
  }
  useEffect(() => {
    const fetchJobs = async () => {
      // console.log("Call API");
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
        // const res = await axios.get("https://jsonplaceholder.typicode.com/users");
        // console.log(res);
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
    // eslint-disable-next-line
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

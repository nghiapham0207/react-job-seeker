import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSliders } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useTransition } from "react";

import GlintContainer from "../GlintContainer";
import { useDeferred } from "../../hooks";

import SearchContainer from "../SearchContainer";
import { path, post } from "../../utils/axiosAPI";
import JobList from "../JobList/JobList";
import {
	// selectCompanies,
	// selectLocationWorkings,
	// selectOccupations,
	selectFilter,
	selectSearch,
	selectUser,
} from "../../redux/selector";
import TagContainer from "../TagStyle/TagContainer";
import TagContent from "../TagStyle/TagContent";

import { usePastJobSearch } from "../../contexts/pastJobSearchContext";
import FilterContainer from "./FilterContainer";
import InfiniteScrollContainer from "../InfiniteScroll/InfiniteScrollContainer";
import MobileFilter from "../MobileFilter/MobileFilter";
import styles from "./ExploreTab.module.scss";
import TabsContainer from "../TabsStyle/TabsContainer";
import TabsHeader from "../TabsStyle/TabsHeader";
import { useQuery } from "@tanstack/react-query";

const cx = classNames.bind(styles);

function ExploreTab() {
	const [showMobileFilterModal, setShowMobileFilterModal] = useState(false);
	const currentUser = useSelector(selectUser);
	const modalRef = useRef();
	const PastJobSearchContext = usePastJobSearch();
	const { pastJobSearch } = PastJobSearchContext;
	const searchInput = useSelector(selectSearch);
	const filter = useSelector(selectFilter);
	const [isPending, startTransition] = useTransition();
	const filterDeferred = useDeferred(filter, 600);

	const handleShowModal = () => {
		setShowMobileFilterModal(!showMobileFilterModal);
	};
	const jobsState = useQuery({
		queryKey: ["jobs", searchInput, filterDeferred],
		queryFn: async () => {
			const dataFilter = {
				key: searchInput,
				idOccupation: filterDeferred.occupations,
				idCompany: filterDeferred.companies,
				locationWorking: filterDeferred.locationWorkings,
			};
			try {
				const res = await post(path.searchJob, dataFilter);
				startTransition(() => {
					// setJobList(res.data);
				});
				return res;
			} catch (error) {
				return Promise.reject(error);
			}
		},
		staleTime: 3 * 60 * 1000,
		refetchOnWindowFocus: false,
		enabled: !!filterDeferred,
	});
	const jobList = jobsState?.data?.data;
	return (
		<>
			{currentUser ? (
				<TabsContainer className={"styles__JobTabList"}>
					<TabsHeader className={"tabs-header"} />
				</TabsContainer>
			) : null}
			<GlintContainer className={cx("styles__ExploreTabBody")}>
				{/* <GlintContainer className={cx("Body")}> */}
				<div className={cx("DesktopSearchBoxWrapper")}>
					<div className={cx("Box__StyledBox")}>
						<SearchContainer />
					</div>
				</div>
				<div className={cx("MobileStickySearchAndFilterContainer")}>
					<div className={cx("Box__StyledBox")}>
						<button type="button" onClick={handleShowModal} className={cx("UnstyleButton", "MobileFilterButton")}>
							<FontAwesomeIcon className="IconStyle__VerticalCenteredSvg" icon={faSliders} />
							<span>Bộ lọc</span>
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
				<h1 className={cx("JobCount")}>{jobList?.length} việc làm tại Vietnam</h1>
				<div className={cx("Body")}>
					{
						// showMobileFilter ?
						showMobileFilterModal && (
							<div className="MobileFilterContainer">
								<MobileFilter modalRef={modalRef} handleShowModal={handleShowModal} />
							</div>
						)
					}
					<FilterContainer />
					<div className={cx("Box__StyledBox", "Flex__StyledFlex", "Flex")}>
						<JobList jobList={jobList} isLoading={jobsState.isFetching} />
						{isPending && <InfiniteScrollContainer size="3rem">Đang tải thêm công việc khác</InfiniteScrollContainer>}
					</div>
				</div>
			</GlintContainer>
		</>
	);
}
export default ExploreTab;

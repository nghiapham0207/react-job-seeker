import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createAxiosJwt, get, path } from "../../utils/axiosAPI";
import { selectAccessToken, selectRefreshToken } from "../../redux/selector";
import GlintContainer from "../../components/GlintContainer";
import styles from "./ApplicationsPage.scss";
import { Pagination } from "../../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faCircle } from "@fortawesome/free-solid-svg-icons";
import EmptyTabView from "../../components/EmptyTabView";
import { dateToString } from "../../utils/helpers";
import InfiniteScrollContainer from "../../components/InfiniteScroll";
import { useQuery } from "@tanstack/react-query";

const cx = classNames.bind(styles);

export default function MyApplicationsPage() {
	const [currentPage, setCurrentPage] = useState(1);
	const dispatch = useDispatch();
	const accessToken = useSelector(selectAccessToken);
	const refressToken = useSelector(selectRefreshToken);
	const { data, isLoading } = useQuery({
		queryKey: ["applications", currentPage, accessToken, refressToken],
		queryFn: async () => {
			const axiosInstance = createAxiosJwt(accessToken, refressToken, dispatch);
			try {
				const res = await get(
					path.application,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
						params: {
							page: currentPage - 1,
						},
					},
					axiosInstance,
				);
				return res;
			} catch (error) {
				return Promise.reject(error);
			}
		},
		staleTime: 3 * 60 * 1000,
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	});
	console.log(data);
	const applications = data?.data.data;
	const handlePageChange = (page) => {
		setCurrentPage(page);
	};
	const totalPages = data?.data.page_total;
	const showEmptyView = applications?.length ? applications.length < 0 : true;
	console.log(showEmptyView);
	return (
		<GlintContainer>
			<div className={cx("ApplicationsPage__TabsContainer")}>
				<div className={cx("ApplicationsPage__HeaderWrapper")}>
					<div className={cx("ApplicationsPage__Header")}>
						{`${applications?.length > 0 ? applications?.length : 0} Đơn ứng tuyển`}
					</div>
				</div>
				<div>
					{isLoading ? (
						<InfiniteScrollContainer />
					) : !showEmptyView ? (
						applications.map((application, index) => (
							<div key={index} className="ApplicationList__ApplicationCardContainer">
								<div>
									{" "}
									{/* a tag */}
									<div className="ApplicationCard__Root">
										<div className="ApplicationInfo__Root">
											<div className="ApplicationInfo__Logo">
												<img src="/static/images/defaultImageCompany.webp" alt={application.idJob.name} />
											</div>
											<div className="ApplicationInfo__Info">
												<div className="ApplicationInfo__Job">
													<div className="ApplicationInfo__JobTitle">{application.idJob.name}</div>
													<div className="ApplicationInfo__ApplicationCompanyInfo">
														<div className="ApplicationInfo__CompanyName">{application.idJob.idCompany.name}</div>
													</div>
													<div className="ApplicationInfo__ActionDate">
														<FontAwesomeIcon icon={faCalendarDays} />
														{"Đã ứng tuyển vào ngày " + dateToString(application.submitDate)}
													</div>
												</div>
												<div className="ApplicationInfo__ApplicationCompanyInfo">
													<Link to={`/job/${application.idJob._id}`} target="_blank">
														{"Xem Công Việc"}
													</Link>
													<div>
														<FontAwesomeIcon
															width={4}
															height={4}
															className={cx("IconStyle__VerticalCenteredSvg")}
															color="var(--secondary-color)"
															icon={faCircle}
														/>
													</div>
													<a href={application.cv} target="_blank" rel="noreferrer">
														{"Xem Hồ Sơ Đã Nộp"}
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						))
					) : (
						<EmptyTabView title="Chưa Có Đơn Ứng Tuyển." />
					)}
				</div>
				{!isLoading && !showEmptyView && (
					<div className={cx("ApplicationsPage__PaginationWrapper")}>
						<Pagination currentPage={currentPage} totalPage={totalPages} onPageChange={handlePageChange} />
					</div>
				)}
			</div>
			{/* PaginationWrapper */}
		</GlintContainer>
	);
}

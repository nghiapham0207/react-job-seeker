import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./Company.module.scss";
import { useDocumentTitle } from "../../hooks";
import GlintContainer from "../../components/GlintContainer";
import { Fragment, useState } from "react";
import { Pagination } from "../../components/Pagination";
import InfiniteScrollContainer from "../../components/InfiniteScroll";
import { Paragraph } from "../../components/ParagraphStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";
import { get, path } from "../../utils/axiosAPI";
import config from "../../config";
import { useQuery } from "@tanstack/react-query";

const cx = classNames.bind(styles);

function Company() {
	useDocumentTitle("Danh Sách Công Ty");
	const [currentPage, setCurrentPage] = useState(1);
	const handlePageChange = (page) => {
		setCurrentPage(page);
	}
	const { isLoading, data, error } = useQuery({
		queryKey: ["companies", currentPage],
		queryFn: async () => {
			window.scrollTo(0, 0);
			try {
				const res = await get(path.companies, {
					params: {
						page: currentPage - 1
					}
				});
				return res;
			} catch (error) {
				return Promise.reject(error);
			}
		},
		staleTime: 3 * 60 * 1000,
		keepPreviousData: true,
		refetchOnWindowFocus: false
	})
	console.log(error);
	if (error) {
		return (
			<div style={{ marginTop: 40 }}>
				<GlintContainer>
					<div className={cx("EmptyView")}>
						{"Error: " + error.response.data.message}
					</div>
				</GlintContainer>
			</div>
		)
	}
	const companies = data?.data.data;
	const totalPage = data?.data.total_page;
	const pageLimit = data?.data.page_limit;
	return (
		<>
			<div className={cx("SearchBarContainer")}>
			</div>
			<GlintContainer>
				{
					isLoading ?
						<div className={cx("EmptyView")}>
							<InfiniteScrollContainer width="3em" height="3em">
								Đang tải
							</InfiniteScrollContainer>
						</div> :
						<>
							{
								companies?.length <= 0 ?
									<div className={cx("EmptyView")}>
										{"Không có dữ liệu"}
									</div> :
									<div className={cx("CompanyCardGrid")}>
										{
											companies.map((company) => (
												<Fragment key={company._id}>
													<Link to={`${config.routes.company}/${company._id}`}
														className={cx("styles__Anchor")}>
														<div className={cx("styles__Card")}>
															<div className={cx("styles__CardHeader")}>
																<img alt={company.name}
																	className={cx("styles__CompanyLogo")}
																	src={company.avatar ?
																		company.avatar :
																		"/static/images/defaultImageCompany.webp"} />
																<div className={cx("styles__TextWrapper")}>
																	<Paragraph bold="500" className={cx("styles__CompanyName")}>
																		{company.name}
																	</Paragraph>
																	<Paragraph>
																		{company.location || "Chưa cập nhật địa chỉ"}
																	</Paragraph>
																</div>
															</div>
															<div className={cx("styles__Row", "styles__InfoRow")}>
																<FontAwesomeIcon icon={faHotel} />
																<Paragraph>
																	{company.type || "Chưa cập nhật loại công ty"}
																</Paragraph>
															</div>
															<div className={cx("styles__Row", "styles__InfoRow")}>
																<Paragraph>
																	{"Quy mô: "}
																	{
																		company.totalEmployee ?
																			company.totalEmployee + " Nhân viên" : " Chưa cập nhật số lượng nhân viên"
																	}
																</Paragraph>
															</div>
														</div>
													</Link>
												</Fragment>
											))
										}
									</div>
							}
							<div className={cx("PaginationContainer")}>
								<Pagination
									totalCount={pageLimit * totalPage}
									totalPage={totalPage}
									onPageChange={handlePageChange}
									pageSize={totalPage}
									currentPage={currentPage} />
							</div>
						</>
				}
			</GlintContainer>
		</>
	)
}

export default Company;

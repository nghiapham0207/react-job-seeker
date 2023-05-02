import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./Company.module.scss";
import { useDocumentTitle } from "../../hooks";
import GlintContainer from "../../components/GlintContainer";
import { Fragment, useEffect, useRef, useState } from "react";
// import axios from "axios";
import { Pagination } from "../../components/Pagination";
import InfiniteScrollContainer from "../../components/InfiniteScroll";
import { Paragraph } from "../../components/ParagraphStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";
import { get, path } from "../../utils/axiosAPI";
import config from "../../config";

const cx = classNames.bind(styles);

function Company() {
	useDocumentTitle("Danh Sách Công Ty");
	// console.log("Company Page");
	const [currentPage, setCurrentPage] = useState(1);
	const [companies, setCompanies] = useState([]);
	const [loading, setLoading] = useState(true);
	const pageSizeRef = useRef(0);
	const pageLimit = useRef(0);
	const handlePageChange = (page) => {
		setCurrentPage(page);
	}
	useEffect(() => {
		const fetchCompanies = async () => {
			setLoading(true);
			window.scrollTo(0, 0);
			try {
				// const res = await axios.get(`https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${pageSizeRef.current}`);
				// console.log(res);
				const res = await get(path.companies, {
					params: {
						page: currentPage - 1
					}
				});
				pageSizeRef.current = res.data.total_page;
				pageLimit.current = res.data.page_limit;
				setCompanies(res.data.data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}
		fetchCompanies();
	}, [currentPage])
	return (
		<>
			<div className={cx("SearchBarContainer")}>

			</div>
			<GlintContainer>
				{
					loading ?
						<div className={cx("EmptyView")}>
							<InfiniteScrollContainer width="3em" height="3em">
								Đang tải
							</InfiniteScrollContainer>
						</div> :
						<>
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
							<div className={cx("PaginationContainer")}>
								<Pagination
									totalCount={pageLimit.current * pageSizeRef.current}
									totalPage={pageSizeRef.current}
									onPageChange={handlePageChange}
									currentPage={currentPage}
									pageSize={pageSizeRef.current} />
							</div>
						</>
				}
			</GlintContainer>
		</>
	)
}

export default Company;
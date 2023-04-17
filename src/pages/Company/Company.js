import classNames from "classnames/bind";

import styles from "./Company.module.scss";
import { useDocumentTitle } from "../../hooks";
import GlintContainer from "../../components/GlintContainer";
import { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Pagination } from "../../components/Pagination";
import InfiniteScrollContainer from "../../components/InfiniteScroll";
import { Paragraph } from "../../components/ParagraphStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";


const cx = classNames.bind(styles);

function PaginationItem({ id, handleItemClick, active, children }) {
	return (
		<div
			id={id}
			onClick={handleItemClick}
			style={{
				backgroundColor: active ? "red" : "orange",
				cursor: "pointer"
			}} >
			{children}
		</div>
	)
}

function Company() {
	useDocumentTitle("Danh Sách Công Ty");
	console.log("Company Page");
	const [currentPage, setCurrentPage] = useState(1);
	const [companies, setCompanies] = useState([]);
	const [loading, setLoading] = useState(true);
	const pageSizeRef = useRef(10);
	const handlePageChange = (page) => {
		setCurrentPage(page);
	}
	useEffect(() => {
		const fetchCompanies = async () => {
			setLoading(true);
			window.scrollTo(0, 0);
			try {
				const res = await axios.get(`https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${pageSizeRef.current}`);
				console.log(res);
				setCompanies(res.data);
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
										<Fragment key={company.id}>
											<a className={cx("styles__Anchor")}>
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
																{company.location || "Address"}
															</Paragraph>
														</div>
													</div>
													<div className={cx("styles__Row", "styles__InfoRow")}>
														<FontAwesomeIcon icon={faHotel} />
														<Paragraph>
															{company.type || "Loại công ty"}
														</Paragraph>
													</div>
													<div className={cx("styles__Row", "styles__InfoRow")}>
														<Paragraph>
															Quy mô:
															{
																company.totalEmployee ?
																	company.totalEmployee + " Nhân viên" : " 500 Nhân viên"
															}
														</Paragraph>
													</div>
												</div>
											</a>
										</Fragment>
									))
								}
							</div>
							<div className={cx("PaginationContainer")}>
								<Pagination
									totalCount={50 * pageSizeRef.current}
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
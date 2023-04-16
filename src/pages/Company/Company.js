import classNames from "classnames/bind";

import styles from "./Company.module.scss";

import { useDocumentTitle } from "../../hooks";
import GlintContainer from "../../components/GlintContainer";
import { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Pagination } from "../../components/Pagination";

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
	const [currentPage, setCurrentPage] = useState(1);
	const [companies, setCompanies] = useState([]);
	const pageSizeRef = useRef(10);
	const handlePageChange = (page) => {
		setCurrentPage(page);
	}
	useEffect(() => {
		const fetchCompanies = async () => {
			try {
				const res = await axios.get(`https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${pageSizeRef.current}`);
				console.log(res);
				setCompanies(res.data);
			} catch (error) {
				console.log(error);
			}
		}
		fetchCompanies();
	}, [currentPage])
	return (
		<>
			<div className={cx("SearchBarContainer")}>

			</div>
			<GlintContainer>
				<div className={cx("CompanyCardGrid")}>
					{
						companies.map((company) => (
							<Fragment key={company.id}>
								<a className={cx("styles__Anchor")}>
									<div className={cx("styles__Card")}>
										<div className={cx("styles__CardHeader")}>
											{company.name}
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
			</GlintContainer>
		</>
	)
}

export default Company;
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import styles from "./DetailCompany.scss";
import GlintContainer from "../../components/GlintContainer/GlintContainer";
import { SolidBtnContainer, SolidButton } from "../../components/ButtonStyle";
import { get, path } from "../../utils/axiosAPI";
import { dateDiff, dateString } from "../../utils/helpers";
import Error from "../../components/Error";
import InfiniteScrollContainer from "../../components/InfiniteScroll/InfiniteScrollContainer";

const cx = classNames.bind(styles);

function DetailCompany() {
	const { _id } = useParams();
	const jobListRef = useRef();
	const [company, setCompany] = useState({});
	const [jobById, setJobById] = useState([]);
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const [companyRes, jobByIdRes] = await Promise.all([
					get(path.company, {
						params: {
							id: _id,
						},
					}),
					get(path.jobListByCompany + `/${_id}`),
				]);
				setCompany(companyRes.data);
				setJobById(jobByIdRes.data);
			} catch (error) {
				console.log(error);
				setError(true);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, [_id]);
	if (isLoading) {
		return (
			<>
				<InfiniteScrollContainer size="4rem" />
			</>
		);
	}
	if (error) {
		return <Error />;
	}
	console.log(company);
	return (
		<GlintContainer className={cx("CompanyPage__Container")}>
			<header className={cx("CompanyPage__Header")}>
				<div className={cx("CompanyPage__BannerContainer")}>
					<img
						src="/static/images/default-banner.webp"
						alt="default-banner"
						className={cx("CompanyPage__BannerPicture")}
					/>
				</div>
				<section className={cx("CompanyPage__Card", "CompanyPage__OverviewCard")}>
					<img
						src="/static/images/defaultImageCompany.webp"
						alt="defaultImageCompany"
						className={cx("CompanyPage__Logo")}
					/>
					<div className={cx("CompanyPage__Overview")}>
						<h1 className={cx("CompanyPage__Name")}>{company.name}</h1>
						<p className={cx("CompanyPage__Tagline")}>
							{
								"Thành lập năm 2006, Tập đoàn YeaH1 từng bước phát triển thành công ty hàng đầu về Truyền thông Công nghệ tại Việt Nam và khu vực Đông Nam Á, với sinh thái đa dạng gồm: Media, Game, Commerce, Financial, Technology, Capital, Global."
							}
						</p>
						<dl className={cx("CompanyPage__AttributeList")}>
							<dt className={cx("CompanyPage__AttributeKey")}>Địa điểm</dt>
							<dd className={cx("CompanyPage__AttributeValue")}>{company.location}</dd>
							<dt className={cx("CompanyPage__AttributeKey")}>Quy mô</dt>
							<dd className={cx("CompanyPage__AttributeValue")}>
								{company.totalEmployee}
								{" nhân viên"}
							</dd>
						</dl>
					</div>
					<div className={cx("CompanyPage__OverviewFooter")}>
						<SolidBtnContainer className={cx("CompanyPage__ViewJobsButton")}>
							<SolidButton
								onClick={() => {
									jobListRef.current.scrollIntoView({
										behavior: "smooth",
									});
								}}>
								Xem việc làm đang tuyển
							</SolidButton>
						</SolidBtnContainer>
					</div>
				</section>
			</header>
			<main className={cx("CompanyPage__Main")}>
				<div className={cx("CompanyPage__LeftColumn")}>
					<section className={cx("CompanyPage__Card")}>
						<h2 className={cx("CompanyPage__CardTitle")}>Thông tin công ty</h2>
						<main className={cx("CompanyPage__CardContent")}>
							<h3 className={cx("CompanyPage__CardSubTitle")}>Giới thiệu</h3>
							<div className={cx("Box__StyledBox")}>
								<hr className={cx("CompanyPage__HorizontalRuler")}></hr>
							</div>
							<div>
								{
									'Thành lập năm 2006, Tập đoàn YeaH1 từng bước phát triển thành công ty hàng đầu về Truyền thông Công nghệ tại Việt Nam và khu vực Đông Nam Á, với sinh thái đa dạng gồm: Media, Game, Commerce, Financial, Technology, Capital, Global. "Chúng tôi truyền tải nội dung phù hợp cho từng đối tượng người xem, thông qua mạng lưới các nhà sản xuất nội dung đầy sáng tạo toàn cầu, và mang đến giải pháp quảng cáo hiệu quả nhất cho đối tác dựa trên nền tảng công nghệ tiên tiến."'
								}
							</div>
						</main>
					</section>
					<section ref={jobListRef} className={cx("CompanyPage__Card")}>
						<h2 className={cx("CompanyPage__CardTitle")}>Việc làm</h2>
						<main className={cx("CompanyPage__CardContent")}>
							<ul className={cx("CompanyPage__JobList")}>
								{jobById.map((job) => (
									<li key={job._id} className={cx("CompanyPage__JobListItem")}>
										<Link to={`/job/${job._id}`}>
											<h3 className="CompanyPage__JobTitle">{job.name}</h3>
											<p className={cx("CompanyPage__JobLocation")}>{job.locationWorking}</p>
											<time className={cx("CompanyPage__JobPostedDate")}>
												{dateString(dateDiff(job.postingDate), "Đăng ")}
											</time>
										</Link>
									</li>
								))}
							</ul>
						</main>
					</section>
				</div>
				<div className={cx("CompanyPage__RightColumn")}>
					<div className={cx("CompanyPage__Card")}>
						<h2 className="CompanyPage__CardTitle">Thư viện ảnh công ty</h2>
						<main className={cx("CompanyPage__CardContent")}>
							<div>
								<div className={cx("Gallery__HeaderWrapper")}>
									<img src="/static/images/lib1.webp" alt={company.name} />
								</div>
							</div>
						</main>
					</div>
				</div>
			</main>
		</GlintContainer>
	);
}

export default DetailCompany;

import { memo, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { faCircle, faClock, faDollar, faHotel, faHourglassStart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";

import { JobContext } from "../../pages/DetailJob";
import ReadMore from "../ReadMore/ReadMore";
import styles from "./Opportunity.module.scss";
import { SolidBtnContainer, SolidButton } from "../ButtonStyle";
import { dateDiff, dateString } from "../../utils/helpers";
import { JobCardWrapper } from "../../components/JobCard";

const cx = classNames.bind(styles);

function Opportunity({ openModal }) {
	const job = useContext(JobContext);
	const requirementRef = useRef(null);
	useEffect(() => {
		requirementRef.current.innerHTML = job.requirement;
	}, [job]);
	return (
		<div className={cx("Container")}>
			<main className={cx("Main")}>
				<div className={cx("TopFold__CompanyAndJobInfo")}>
					<div className={cx("TopFold__CompanyLogo")}>
						<img src="/static/images/defaultImageCompany.webp" alt="Logo Company" />
					</div>
					<div className={cx("TopFold__JobOverViewContainer")}>
						<div>
							<div className={cx("TopFold__JobOverViewHeader")}>
								<h1 className={cx("TopFold__JobOverViewTitle")}>{job.name}</h1>
							</div>
							<div className={cx("TopFold__JobOverViewCompanyInfo")}>
								<div className={cx("TopFold__JobOverViewCompanyName")}>
									<Link to={`/company/${job.idCompany?._id}`}>{job?.idCompany?.name}</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={cx("fresnel-lessThan-desktopS")}>
					<div className={cx("TopFold__DividerContainerMobile")}>
						<div className={cx("DividerStyle__DividerContainer")} />
					</div>
				</div>
				<div className={cx("TopFold__JobOverViewInfoContainer")}>
					<div className={cx("TopFold__JobOverViewInfo", "TopFold__SalaryJobOverView")}>
						<div>
							<FontAwesomeIcon className={cx("IconStyle__VerticalCenteredSvg")} icon={faDollar} />
							<span>{job.salary}</span>
						</div>
					</div>
					<div className={cx("TopFold__JobOverViewInfo")}>
						<FontAwesomeIcon className={cx("IconStyle__VerticalCenteredSvg")} icon={faHotel} />
						{job?.idOccupation?.name}
					</div>
					<div className={cx("TopFold__JobOverViewInfo")}>
						<FontAwesomeIcon className={cx("IconStyle__VerticalCenteredSvg")} icon={faHourglassStart} />
						{job.hourWorking}
					</div>
					<div className={cx("TopFold__BadgesAndJobOverViewTimeContainer")}>
						<div className={cx("TopFold__JobOverViewTime")}>
							<FontAwesomeIcon icon={faClock} />
							<span className={cx("TopFold__PostedAt")}>{dateString(dateDiff(job.postingDate), "Đăng ")}</span>
							<FontAwesomeIcon width={4} height={4} className={cx("IconStyle__VerticalCenteredSvg")} icon={faCircle} />
							<span className={cx("TopFold__UpdateAt")}>{dateString(dateDiff(job.updateDate))}</span>
						</div>
					</div>
					<div className={cx("TopFold__ButtonContainer")}>
						<div className={cx("TopFold__ApplyButtonDesktop")}>
							<div className={cx("ApplyButton__ApplyButton")}>
								<SolidBtnContainer>
									<SolidButton disable={job.isApply ? true : false} onClick={openModal}>
										{job.isApply ? "Bạn đã ứng tuyển công việc này!" : "Ứng tuyển nhanh"}
									</SolidButton>
								</SolidBtnContainer>
							</div>
						</div>
					</div>
				</div>
				<div className={cx("DividerContainer")}>
					<div className={cx("DividerStyle__DividerContainer")}></div>
				</div>
				<div className={cx("SkillsContainer")}>
					<div className={cx("Skills__TitleContainer")}>
						<h2 className={cx("Skills__Title")}>Skills</h2>
					</div>
					{/* <div className={cx("SkillsTagOverride", "TagStyle__TagContainer")}>
          <label className={cx("TagStyle__TagContent")}>
            {job.requirement}
          </label>
        </div> */}
					<div style={{ paddingLeft: 20 }} ref={requirementRef}>
						{/* {job.requirement} */}
					</div>
				</div>
				<div className={cx("JobDescriptionContainer")}>
					<div className={cx("JobDescription__TitleContainer")}>
						<h2 className={cx("JobDescription__Title")}>
							Chi tiết công việc {job.name} tại {job?.idCompany?.name}
						</h2>
					</div>
					{/* ReadMore here */}
					{/* <ReadMore text={"Mô tả công việc- Tham gia xây dựng và phát triển dự án.- Làm việc theo quy trình, các công cụ phần mềm hỗ trợ của công ty (quản lý dự án, phân công công việc…).- Nghiên cứu công nghệ và phát triển sản phẩm.- Triển khai sự kiện theo lịch phân công từ Team Leader.- Được hướng dẫn sử dụng thiết bị và các công cụ triển khai.- Đảm nhận vị trí kỹ thuật theo từng vai trò được giao.Yêu cầu ứng viên- Sinh viên năm cuối hoặc mới tốt nghiệp trung cấp, cao đẳng, đại học CNTT- Có kiến thức về lập trình về ngôn ngữ C#, Asp.net, SQL.- Có kiến thức cơ bản về html, javascript, css. AngularJS là một lợi thế. - Ưu tiên các thực tập sinh hiểu biết về ngôn ngữ Python.- Có khả năng làm việc nhóm tốt và chủ động trong công việc- Thái độ tốt, khả năng giao tiếp và xử lý tình huống tốtQuyền lợi- Có lương trợ cấp theo năng lực.- Môi trường làm việc sáng tạo, chuyên nghiệp.- Hỗ trợ phụ cấp và dấu mộc cho thực tập sinh. Cơ hội trở thành nhân viên chính thức tại công ty.- Được hưởng tất cả chế độ, quyền lợi, đãi ngộ theo quy định tại Công Ty TNHH CLOUDMEDIA- Được tham gia các khóa đào tạo nội bộ và bên ngoài nhằm trang bị, bồi dưỡng kiến thức, kỹ năng mềm phục vụ cho công việc."} /> */}
					<ReadMore text={job?.description} maxLength={20} />
				</div>
			</main>
			<aside className={cx("DesktopAside")}>
				<div className={cx("DesktopSimilarJobsWrapper")}>
					<div className={cx("SimilarJobsSection__HeaderWrapper")}>
						<div className={cx("SimilarJobsSection__Header")}>Việc làm tương tự</div>
					</div>
					{job.relatedJob?.length > 0
						? job.relatedJob.map((relJob) => (
								<JobCardWrapper key={relJob._id} job={relJob} className="SimilarJobsSection__JobCardWrapper" />
						  ))
						: "Không tìm thấy việc làm tương tự"}
				</div>
			</aside>
		</div>
	);
}

// export default Opportunity;
export default memo(Opportunity);

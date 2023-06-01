import { faFileLines, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";

import { ModalContainer, ModalDialog, ModalContentArea, ModalHeader, ModalBody } from "../ModalStyle";
import { JobContext } from "../../pages/DetailJob";
import { SolidBtnContainer, SolidButton } from "../ButtonStyle";
import styles from "./PsychFlatModal.module.scss";
import { convertSizeFile, getImageUrl } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken, selectRefreshToken, selectUser } from "../../redux/selector";
import { applyJob } from "../../services/jobService";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function PsychFlatModal({ handleShowPsychFlat }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// should pass from higher level
	const [selectedFile, setSelectedFile] = useState(null);
	const modalRef = useRef();
	const cvInputRef = useRef(null);
	const job = useContext(JobContext);
	// const timeUpload = useRef(new Date());
	const timeUpload = new Date();
	const currentUser = useSelector(selectUser);
	const accessToken = useSelector(selectAccessToken);
	const refreshToken = useSelector(selectRefreshToken);
	// giải pháp tạm thời tạo input type file và ẩn
	const handleUploadFile = () => {
		if (!selectedFile) {
			cvInputRef.current.value = "";
			cvInputRef.current.click();
		}
	};
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		const lastModified = file.lastModified;
		const date = new Date(lastModified);
		console.log(date);
		if (file?.size / (1024 * 1024) > 5) {
			toast.error("Tệp tải lên tối đa 5MB");
		} else {
			setSelectedFile(file);
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const date = new Date();
		const formData = new FormData();
		formData.append("idJobSeeker", currentUser._id);
		formData.append("idJob", job._id);
		formData.append("cv", selectedFile);
		formData.append("submitDate", date);
		applyJob(formData, accessToken, refreshToken, dispatch, navigate);
	};
	return (
		<ModalContainer className={cx("CustomModal")} handleShowModal={handleShowPsychFlat} modalRef={modalRef}>
			<ModalDialog>
				<ModalContentArea modalRef={modalRef}>
					<ModalHeader handleShowModal={handleShowPsychFlat} />
					<ModalBody className={cx("modal-body")}>
						<p className={cx("ParagraphStyle__Paragraph", "ModalTitle")}>
							{"Bạn đang ứng tuyển cho "}
							<b>Heramo Co., Ltd</b>
							{" với vị trí "}
							<b>NHÂN VIÊN SEO (INTERN / PART-TIME)</b>
						</p>
						<div className={cx("ModalImageWrapper")}>
							<div className={cx("ModalImage", "left")}>
								<img alt="Company" sizes="100px" src="/static/images/defaultImageCompany.webp" />
							</div>
							<div className={cx("ModalImage", "right")}>
								{/* <img alt="User Image" sizes="100px" src="/static/images/defaultUser.webp" /> */}
								<img
									alt="User"
									sizes="100px"
									src={currentUser.avatar ? getImageUrl(currentUser) : "/static/images/defaultUser.webp"}
									onError={(e) => {
										e.target.src = "/static/images/defaultUser.webp";
									}}
								/>
							</div>
						</div>
						<form onSubmit={handleSubmit}>
							<input
								ref={cvInputRef}
								type="file"
								accept=".pdf"
								name="cv-file"
								style={{ display: "none" }}
								onChange={handleFileChange}
							/>
							<section className={cx("Section")}>
								<p className={cx("ParagraphStyle__Paragraph", "RegularParagraph", "SectionHeader")}>
									<FontAwesomeIcon icon={faFileLines} className={cx("IconStyle__VerticalCenterSvg")} />
									{"Hồ sơ xin việc"}
									{"*"}
								</p>
								<div
									className={cx(selectedFile ? "UploadResumesc__UploadArea--Loaded" : "UploadResumesc__UploadArea")}
									onClick={handleUploadFile}>
									<div
										className={cx("UploadResumesc__GlintsDropzoneWrapper")}
										style={{ display: !selectedFile ? "" : "none" }}>
										<div className={cx("filepicker", "dropzone", "dz-clickable")}>
											<div className={cx("dz-default", "dz-message")}>
												<span>
													<div className={cx("UploadResumesc__CenterIconWithText", "UploadResumesc__UploadMessage")}>
														<FontAwesomeIcon icon={faFileLines} className={cx("IconStyle__VerticalCenterSvg")} />
														{"Đăng tải hồ sơ của tôi"}
													</div>
												</span>
											</div>
										</div>
									</div>
									{selectedFile && (
										<div className={cx("UploadResumesc__ResumeWrapper")}>
											<p
												className={cx(
													"ParagraphStyles__Paragraph",
													"aries-typography-paragraph",
													"UploadResumesc__ResumeName",
												)}
												color="#000000"
												data-gtm-resume="true">
												{selectedFile.name}
											</p>
											<div className={cx("UploadResumesc__ResumeDetailContainer")}>
												<p
													className={cx(
														"ParagraphStyles__Paragraph",
														"aries-typography-paragraph",
														"UploadResumesc__ResumeDetail",
													)}
													color="#777777">
													{convertSizeFile(selectedFile.size)}
													<span className={cx("UploadResumesc__Dot")}></span>
													{/* {"Đã tải lên vào 19 Thg 03 2023, 20:11"} */}
													{selectedFile &&
														`${timeUpload?.getDate()} Thg 
                          ${timeUpload?.getMonth() + 1} 
                          ${timeUpload?.getFullYear()}, 
                          ${timeUpload?.getHours()}:
                          ${timeUpload?.getMinutes()}`}
												</p>
											</div>
											<div
												className={cx("UploadResumesc__CenterIconWithText", "UploadResumesc__RemoveButton")}
												onClick={() => {
													setSelectedFile(null);
												}}>
												<FontAwesomeIcon icon={faTrashCan} className={cx("IconStyle__VerticalCenterSvg")} />
												{"Xoá tập tin"}
											</div>
										</div>
									)}
								</div>
								<p
									className={cx("ParagraphStyles__Paragraph", "aries-typography-paragraph", "ResumeHint")}
									color="#777777">
									<span className={cx("HighlightText")}>
										{
											"Lưu ý : đảm bảo hồ sơ xin việc của bạn sử dụng ngôn ngữ trùng khớp với mô tả công việc (Ví dụ: viết CV bằng tiếng Anh nếu mô tả công việc bằng tiếng Anh)  và đăng tải dưới dạng PDF dưới 5MB."
										}
									</span>
									{"Hồ sơ đã đăng tải sẽ được lưu lại cho lần nộp đơn sau."}
								</p>
							</section>
							<SolidBtnContainer className={cx("aries-solid-btn", "ApplyBtn")}>
								<SolidButton type="submit" disable={selectedFile ? false : true} className={cx("solid-btn-content")}>
									Ứng Tuyển Ngay
								</SolidButton>
							</SolidBtnContainer>
						</form>
					</ModalBody>
				</ModalContentArea>
			</ModalDialog>
		</ModalContainer>
	);
}

export default PsychFlatModal;

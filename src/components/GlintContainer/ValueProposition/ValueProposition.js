import classNames from "classnames/bind";

import styles from "./ValueProposition.module.scss";
import images from "../../../assets/images";

const cx = classNames.bind(styles);

function ValueProposition() {
	return (
		<div className={cx("ValuePropositionComponentssc__Container", "fybKJF")}>
			<div className={cx("fresnel-lessThan-mobileL")}>
				<div className={cx("ValuePropositionComponentssc__TopContainer", "bjHYkK")}>
					<img
						className={cx("ValuePropositionComponentssc__BackgroundImage", "cmIRSF")}
						sizes="400px"
						alt="value-proposition-desktop"
						src={images.proposition}
					/>
					<h1 className={cx("ValuePropositionComponentssc__TextHolder", "gnKIIx")}>
						{"Tham gia Cộng đồng "}
						<span className={cx("ValuePropositionComponentssc__RedText", "hiOqk")}>
							{"1.000.000"}
							{"+"}
						</span>
						{" ứng viên tài năng"}
					</h1>
				</div>
			</div>
			<div className={cx("fresnel-greaterThanOrEqual-mobileL")}>
				<div className={cx("ValuePropositionComponentssc__TopContainer", "bjHYkK")}>
					<img
						className={cx("ValuePropositionComponentssc__BackgroundImage", "cmIRSF")}
						sizes="400px"
						alt="value-proposition-desktop"
						src={images.proposition}
					/>
					<h1 className={cx("ValuePropositionComponentssc__TextHolder", "gnKIIx")}>
						{"Tham gia Cộng đồng "}
						<span className={cx("ValuePropositionComponentssc__RedText", "hiOqk")}>
							{"1.000.000"}
							{"+"}
						</span>
						{" ứng viên tài năng"}
					</h1>
				</div>
			</div>
			<div className={cx("ValuePropositionComponentssc__InformationContainer", "fpxWRS")}>
				<div
					className={cx(
						"InformationStyle__InformationContainer",
						"ienjyA",
						"ValuePropositionComponentssc__CustomInformation",
						"eIxizr",
					)}>
					<p className={cx("InformationStyle__TitleWrapper", "rtoFO")}>
						<span>Khám phá nghề nghiệp mơ ước</span>
					</p>
					<p
						className={cx(
							"InformationStyle__DescriptionWrapper gRXmVL",
							"ValuePropositionComponentssc__CustomInformationDescription",
							"bNUkJP",
						)}>
						<span>Khám phá nghề nghiệp mơ ước và ứng tuyển hàng ngàn việc làm nổi bật nhất hiện nay!</span>
					</p>
					<div className={cx("ValuePropositionComponentssc__DividerWrapper", "fabkmi")}>
						<div className={cx("DividerStyle__DividerContainer", "gcGgrz", "aries-divider")}></div>
					</div>
				</div>
				<div
					className={cx(
						"InformationStyle__InformationContainer",
						"ienjyA",
						"ValuePropositionComponentssc__CustomInformation",
						"eIxizr",
					)}>
					<p className={cx("InformationStyle__TitleWrapper", "rtoFO")}>
						<span>Phát triển kỹ năng chuyên môn</span>
					</p>
					<p
						className={cx(
							"InformationStyle__DescriptionWrapper gRXmVL",
							"ValuePropositionComponentssc__CustomInformationDescription",
							"bNUkJP",
						)}>
						<span>Nắm bắt cơ hội phát triển kỹ năng chuyên môn của bạn</span>
					</p>
					<div className={cx("ValuePropositionComponentssc__DividerWrapper", "fabkmi")}>
						<div className={cx("DividerStyle__DividerContainer", "gcGgrz", "aries-divider")}></div>
					</div>
				</div>
				<div
					className={cx(
						"InformationStyle__InformationContainer",
						"ienjyA",
						"ValuePropositionComponentssc__CustomInformation",
						"eIxizr",
					)}>
					<p className={cx("InformationStyle__TitleWrapper", "rtoFO")}>
						<span>Kết nối với công ty trên toàn thế giới</span>
					</p>
					<p
						className={cx(
							"InformationStyle__DescriptionWrapper gRXmVL",
							"ValuePropositionComponentssc__CustomInformationDescription",
							"bNUkJP",
						)}>
						<span>Đừng bỏ lỡ cơ hội kết nối với các công ty trên toàn cầu và nắm bắt cơ hội việc làm mới nhất</span>
					</p>
				</div>
			</div>
		</div>
	);
}

export default ValueProposition;

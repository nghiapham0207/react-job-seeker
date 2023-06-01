import classNames from "classnames/bind";

import styles from "./StatisticDisplay.module.scss";

const cx = classNames.bind(styles);

function StatisticDisplay() {
	return (
		<div className={cx("Container")}>
			<div className={cx("CustomStats")}>
				<div className={cx("Label")}>Chúng tôi đã giúp</div>
				<div className={cx("Label")}>
					<b>4.013.612</b>
				</div>
				<div className={cx("Label")}>bạn trẻ khám phá nghề nghiệp mơ ước</div>
			</div>
			<div className={cx("CustomStats")}>
				<div className={cx("Label")}>Chúng tôi đã đồng hành cùng</div>
				<div className={cx("Label")}>
					<b>52.591</b>
				</div>
				<div className={cx("Label")}>công ty trên toàn cầu xây dựng thành công nhóm nhân lực tài năng</div>
			</div>
			<div className={cx("CustomStats")}>
				<div className={cx("Label")}>Khám phá ngay</div>
				<div className={cx("Label")}>
					<b>12.991</b>
				</div>
				<div className={cx("Label")}>cơ hội việc làm mới nhất hằng tháng</div>
			</div>
		</div>
	);
}

export default StatisticDisplay;

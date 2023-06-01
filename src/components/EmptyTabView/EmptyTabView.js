import classNames from "classnames/bind";

import { SolidBtnContainer, SolidButton } from "../ButtonStyle";
import styles from "./EmptyTabView.module.scss";
import { useNavigate } from "react-router-dom";
import config from "../../config";

const cx = classNames.bind(styles);

export default function EmptyTabView({ title = "Chưa có việc nào được lưu." }) {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(config.routes.opportunities + "/explore");
	};
	return (
		<section className={cx("EmptyTabView")}>
			<img src="/static/images/empty-tab-view.webp" alt="empty-tab-view" />
			<h2 className={cx("Title")}>{title}</h2>
			<SolidBtnContainer block={false}>
				<SolidButton onClick={handleClick}>Khám phá các việc làm mới!</SolidButton>
			</SolidBtnContainer>
		</section>
	);
}

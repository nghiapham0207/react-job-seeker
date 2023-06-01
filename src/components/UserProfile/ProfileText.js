import classNames from "classnames/bind";

import styles from "./UserProfile.module.scss";

const cx = classNames.bind(styles);

function ProfileText({ children }) {
	return <p className={cx("ProfileText")}>{children}</p>;
}

export default ProfileText;

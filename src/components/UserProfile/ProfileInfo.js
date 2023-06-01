import classNames from "classnames/bind";

import styles from "./UserProfile.module.scss";

const cx = classNames.bind(styles);

function ProfileInfo({ children }) {
	return <div className={cx("ProfileInfo")}>{children}</div>;
}

export default ProfileInfo;

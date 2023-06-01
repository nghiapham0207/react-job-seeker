import classNames from "classnames/bind";

import styles from "./UserProfile.module.scss";

const cx = classNames.bind(styles);

function ProfileName({ children }) {
	return <p className={cx("ProfileName")}>{children}</p>;
}

export default ProfileName;

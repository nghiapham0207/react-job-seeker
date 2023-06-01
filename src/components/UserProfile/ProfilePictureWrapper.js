import classNames from "classnames/bind";

import styles from "./UserProfile.module.scss";

const cx = classNames.bind(styles);

function ProfilePictureWrapper({ children }) {
	return <div className={cx("ProfilePictureWrapper")}>{children}</div>;
}

export default ProfilePictureWrapper;

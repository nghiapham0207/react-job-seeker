import classNames from "classnames/bind";

import styles from "./ProfilePictureStyle.module.scss";

const cx = classNames.bind(styles);

function ProfilePictureContainer({ children }) {
	return <div className={cx("ProfilePictureContainer")}>{children}</div>;
}

export default ProfilePictureContainer;

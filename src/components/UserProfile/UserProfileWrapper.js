import classNames from "classnames/bind";

import styles from "./UserProfile.module.scss";

const cx = classNames.bind(styles);

function UserProfileWrapper({ children }) {
	return <div className={cx("Wrapper")}>{children}</div>;
}

export default UserProfileWrapper;

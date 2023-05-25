import classNames from "classnames/bind";

import styles from "./LoginPage.module.scss";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/selector";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import config from "../../config";

const cx = classNames.bind(styles);

export default function LoginPage() {
  const currentUser = useSelector(selectUser);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const next = searchParams.get("next");
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      if (next) {
        navigate(next);
      } else {
        navigate(config.routes.job);
      }
    }
  }, [currentUser, navigate])
  return (
    <div className={cx("Container")}>
      <div className={cx("HeaderWrapper")}>
        <div className={cx("Header__Container")}>
          <div className={cx("Header__TitleWrapper")}>
            <h2 style={{ fontSize: "20px" }} className={cx("Header__SubTitle")}>Đăng nhập vào tài khoản Glints của bạn</h2>
          </div>
        </div>
      </div>
      <div className={cx("InnerWrapper")}>
        <LoginForm />
      </div>
    </div>
  )
}
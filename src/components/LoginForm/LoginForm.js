import { toast } from "react-toastify";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';

import styles from "./LoginForm.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import config from "../../config";
import { usernameRegex } from "../../utils/regex";
import WarningMessage from "../Message/WarningMessage";

const cx = classNames.bind(styles);

function LoginForm({ handleShowLogin = () => { } }) {
  const location = useLocation();
  // const { next } = useParams();
  const searchParams = new URLSearchParams(location.search);
  const next = searchParams.get("next");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: ""
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }
  const handleLogin = (e) => {
    e.preventDefault();
    const hasErrors = {}
    if (usernameRef.current.value === "") {
      hasErrors.username = "Chưa nhập tài khoản";
    } else if (!(usernameRegex.test(usernameRef.current.value))) {
      hasErrors.username = "Tên đăng nhập chỉ chứa ký tự [a-z] [0-9]";
    }
    if (passwordRef.current.value === "") {
      hasErrors.password = "Chưa nhập mật khẩu";
    } else if (passwordRef.current.value.length < 6) {
      hasErrors.password = "Mật khẩu tối thiểu 6 ký tự!";
    }
    if (!Object.keys(hasErrors).length) {
      setErrors({});
      const loginRequest = async () => {
        const idToast = toast.loading("Đang xử lý!");
        const hasErr = await login({
          username: usernameRef.current.value,
          password: passwordRef.current.value
        }, dispatch, navigate, next);
        if (hasErr) {
          setErrorMessage(hasErr);
          toast.update(idToast, {
            render: "Đăng nhập thất bại!",
            type: "error",
            closeButton: true,
            autoClose: 1000,
            isLoading: false
          });
        } else {
          handleShowLogin();
          toast.update(idToast, {
            render: "Đăng nhập thành công!",
            type: "success",
            closeButton: true,
            autoClose: 1000,
            isLoading: false
          });
          if (next) {
            // toast.info("Đang chuyển hướng!", {
            //   autoClose: 1000
            // });
            // navigate(next);
            setTimeout(() => {
              navigate(next);
            }, 1000);
          }
        }
      }
      loginRequest();
    } else {
      setErrors(hasErrors);
    }
  }
  return (
    <div className={cx("Body")}>
      <div className={cx("ContentWrapper")}>
        <form style={{ paddingTop: 2 }}>
          {
            next &&
            <WarningMessage title={"Yêu cầu đăng nhập"} subTitle={"Trang bạn đang cố truy cập yêu cầu bạn đăng nhập."} />
          }
          <div className={cx("Field")}>
            <div className={cx("TextFieldContainer")}>
              <input ref={usernameRef} type="text" aria-label="Tên tài khoản"
                placeholder="Tên tài khoản"
                className={cx("TextFieldInput")}
                // value={username}
                defaultValue={"nghia"}
                onChange={() => {
                  setErrors({ ...errors, username: "" });
                }} />
              <label className={cx("TextFieldLabel")}>Tên tài khoản</label>
            </div>
            {errors.username && <p className={cx("ValidationError")}>{errors.username}</p>}
          </div>
          <div className={cx("Field")}>
            <div className={cx("TextFieldContainer")}>
              <input ref={passwordRef} type={showPassword ? "text" : "password"}
                aria-label="Mật khẩu" className={cx("TextFieldInput")}
                // value={password}
                defaultValue={"123123"}
                maxLength="30"
                onChange={(e) => {
                  // setPassword(e.target.value);
                  setErrors({ ...errors, password: "" });
                }}
                placeholder="Mật khẩu" />
              <label className={cx("TextFieldLabel")}>Mật khẩu</label>
              <div onClick={handleShowPassword} className={cx("IconContainer")}>
                <span className="">{showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}</span></div>
            </div>
            {errors.password && <p className={cx("ValidationError")}>{errors.password}</p>}
          </div>
          <div className={cx("ForgotPasswordLinkWrapper")}>
            <button type="button" className={cx("ForgotPasswordLink")}
              onClick={() => {
                handleShowLogin();
                navigate(config.routes.forgotPassword);
              }} >Quên mật khẩu?</button>
          </div>
          {errorMessage && <div className={cx("ErrorMessage")}>
            <p className={cx("MessageHeader")}>{errorMessage}</p>
          </div>}
          <div className={cx("SolidShadowContainer")}>
            <button className={cx("SolidShadowBtn")} type="submit"
              onClick={handleLogin}
            >
              <span>Đăng nhập</span>
            </button>
          </div>
        </form>
      </div>
      <div className={cx("ContentWrapper")}>
        <div className={cx("SignupLink")}>
          {"Chưa có tài khoản "}
          <span className={cx("Highlight")}
            onClick={handleShowLogin} >
            <Link to={config.routes.signUp}>
              {"nhấn vào đây"}
            </Link>
          </span>
          {" để đăng ký."}
        </div>
      </div>
      <div className={cx("Content")}>
        <p>
          {"Nếu là nhà tuyển dụng, hãy "}
          <a target="_blank" rel="noreferrer" className={cx()} href={config.routes.recruitment}>
            {"nhấn vào đây."}
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginForm;

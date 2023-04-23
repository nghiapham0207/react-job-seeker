import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';

import styles from "./LoginForm.module.scss";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/authService";
import config from "../../../config";
import { usernameRegex } from "../../../utils/regex";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function LoginForm({ handleShowLogin }) {
  // console.log("Render Login Form");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "") {
      setUsernameError("Chưa nhập tài khoản"); // set many time cause re-render
      usernameRef.current.focus();
      return;
    } else if (!(usernameRegex.test(username))) {
      setUsernameError("Tên đăng nhập chỉ chứa ký tự [a-z] [0-9]");
      usernameRef.current.focus();
      return;
    }
    if (password === "") {
      setPasswordError("Chưa nhập mật khẩu");
      passwordRef.current.focus();
      return;
    } else if (password.length < 6) {
      setPasswordError("Mật khẩu tối thiểu 6 ký tự!");
      passwordRef.current.focus();
      return;
    }
    const loginRequest = async () => {
      const idToast = toast.loading("Đang xử lý!");
      const hasErr = await login({ username, password }, dispatch, navigate);
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
      }
    }
    loginRequest();
  }
  return (
    <div className={cx("Body")}>
      <div className={cx("ContentWrapper")}>
        <form>
          <div className={cx("Field")}>
            <div className={cx("TextFieldContainer")}>
              <input ref={usernameRef} type="text" aria-label="Tên tài khoản"
                placeholder="Tên tài khoản"
                className={cx("TextFieldInput")}
                value={username}
                onChange={(e) => { setUsername(e.target.value); setUsernameError("") }} />
              <label className={cx("TextFieldLabel")}>Tên tài khoản</label>
            </div>
            {usernameError && <p className={cx("ValidationError")}>{usernameError}</p>}
          </div>
          <div className={cx("Field")}>
            <div className={cx("TextFieldContainer")}>
              <input ref={passwordRef} type={showPassword ? "text" : "password"}
                aria-label="Mật khẩu" className={cx("TextFieldInput")}
                value={password} maxLength="30"
                onChange={(e) => { setPassword(e.target.value); setPasswordError("") }}
                placeholder="Mật khẩu" />
              <label className={cx("TextFieldLabel")}>Mật khẩu</label>
              <div onClick={handleShowPassword} className={cx("IconContainer")}>
                <span className="">{showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}</span></div>
            </div>
            {passwordError && <p className={cx("ValidationError")}>{passwordError}</p>}
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
          Chưa có tài khoản <span className={cx("Highlight")}>nhấn vào đây</span> để đăng ký.
        </div>
      </div>
      <div className={cx("Content")}>
        <p>Nếu là nhà tuyển dụng, hãy <a className={cx()} href="/">nhấn vào đây.</a></p>
      </div>
    </div>
  )
}

export default LoginForm;

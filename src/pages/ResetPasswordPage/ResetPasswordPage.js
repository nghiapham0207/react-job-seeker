import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";

import styles from "./ResetPasswordPage.module.scss";
import { Title } from "../../components/TitleStyle";
import {
  TextFieldContainer,
  TextFieldInput,
  TextFieldLabel
} from "../../components/TextFieldStyle";
import { Paragraph } from "../../components/ParagraphStyle";
import { SolidBtnContainer, SolidButton } from "../../components/ButtonStyle";
import { useLocation, useNavigate } from "react-router-dom";
import { path, put } from "../../utils/axiosAPI";
import { toast } from "react-toastify";
import config from "../../config";

const cx = classNames.bind(styles);

function ResetPasswordPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email;
  const [verifyCode, setVerifyCode] = useState("");
  const [password, setPassword] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [verifyCodeError, setVerifyCodeError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [pwConfirmError, setPwConfirmError] = useState("");
  const verifyCodeRef = useRef();
  const passwordRef = useRef();
  const pwConfirmRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!verifyCode) {
      setVerifyCodeError("Bắt buộc!");
    } else {

    }
    if (!password) {
      setPasswordError("Bắt buộc!");
    }
    if (!pwConfirm) {
      setPwConfirmError("Bắt buộc!");
    } else if (pwConfirm !== password) {
      setPwConfirmError("Mật khẩu xác nhận không khớp!");
    }
    const fetchApi = async () => {
      try {
        const res = await put(path.resetPassword, {
          newPassword: password,
          confirmPasswordCode: verifyCode,
          email: email
        });
        toast.success(res.message);
        // handle show login
        navigate(config.routes.home);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
    fetchApi();
  }
  useEffect(() => {
    if (!email) {
      navigate(config.routes.forgotPassword);
    }
  })
  return (
    <div className={cx("GlintContainer")}>
      <section className={cx("Section")}>
        <Title as="h3"
          className={cx("aries-typography-title", "Title")} >
          Đặt lại mật khẩu của bạn
        </Title>
        <div className={cx("FormContainer")}>
          <form
            // noValidate
            onSubmit={handleSubmit}>
            <TextFieldContainer className={"aries-textfield"}>
              <TextFieldInput name="password" ariaLabel="Mã xác nhận"
                value={verifyCode}
                ref={verifyCodeRef}
                onChange={e => {
                  setVerifyCode(e.target.value);
                  setVerifyCodeError("");
                }}
                placeholder={"Mã xác nhận"} />
              <TextFieldLabel>
                Mã xác nhận
              </TextFieldLabel>
            </TextFieldContainer>
            <Paragraph color="#EC272B"
              className={cx("aries-typography-paragraph", "FieldError")}>
              {verifyCodeError}
            </Paragraph>
            <br />
            <TextFieldContainer className={"aries-textfield"}>
              <TextFieldInput type="password" name="password" ariaLabel="Mật khẩu"
                value={password}
                ref={passwordRef}
                onChange={e => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                placeholder={"Địa chỉ email"} />
              <TextFieldLabel>
                Mật khẩu mới
              </TextFieldLabel>
            </TextFieldContainer>
            <Paragraph color="#EC272B"
              className={cx("aries-typography-paragraph", "FieldError")}>
              {passwordError}
            </Paragraph>
            <br />
            <TextFieldContainer className={"aries-textfield"}>
              <TextFieldInput type="password" name="password" ariaLabel="Mật khẩu"
                value={pwConfirm}
                ref={pwConfirmRef}
                onChange={e => {
                  setPwConfirm(e.target.value);
                  setPwConfirmError("");
                }}
                placeholder={"Địa chỉ email"} />
              <TextFieldLabel>
                Xác nhận mật khẩu
              </TextFieldLabel>
            </TextFieldContainer>
            <Paragraph color="#EC272B"
              className={cx("aries-typography-paragraph", "FieldError")}>
              {pwConfirmError}
            </Paragraph>
            <SolidBtnContainer className={cx("aries-solid-btn", "SubmitBtn")}>
              <SolidButton type="submit" block
                className={cx("solid-btn-content")}>
                Gửi
              </SolidButton>
            </SolidBtnContainer>
          </form>
        </div>
      </section>
    </div>
  )
}

export default ResetPasswordPage;

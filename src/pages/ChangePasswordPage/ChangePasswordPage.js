import classNames from "classnames/bind";

import {
  ContentSection,
  ContentSectionTitle,
  ContentSectionMain
} from "../../components/Shared";

import styles from "./ChangePasswordPage.module.scss";
import { GhostBtn, GhostBtnContainer } from "../../components/ButtonStyle";
import { TextFieldContainer, TextFieldInput, TextFieldLabel } from "../../components/TextFieldStyle";
import { Paragraph } from "../../components/ParagraphStyle";
import { useRef, useState } from "react";
import { createAxiosJwt } from "../../utils/axiosAPI";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken, selectRefreshToken } from "../../redux/selector";
import { path } from "../../utils/axiosAPI";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function ChangePasswordPage() {
  // const [pwError, setPwError] = useState();
  // const [newPwError, setNewPwError] = useState();
  // const [confirmPwError, setConfirmPwError] = useState();
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const refressToken = useSelector(selectRefreshToken);
  const [errorMessage, setErrorMessage] = useState({
    pwError: "",
    newPwError: "",
    confirmPwError: ""
  });
  const passwordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  const handleCheckConfirm = () => {
    if (newPasswordRef.current.value) {

    }
  }
  const handleChangePassword = async () => {
    const axiosInstance = createAxiosJwt(accessToken, refressToken, dispatch);
    try {
      const res = await axiosInstance.put(path.changePassword, {
        password: passwordRef.current.value,
        newPassword: newPasswordRef.current.value
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      console.log(res);
      if (res.data.isSuccess) {
        toast.success(res.data.message, {
          position: "top-center"
        });
        passwordRef.current.value = "";
        newPasswordRef.current.value = "";
        confirmPasswordRef.current.value = "";
      }
    } catch (error) {
      console.log(error.response.data);
      if (!error.response.data.isSuccess) {
        toast.error(error.response.data.message, {
          position: "top-center"
        })
      }
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const error = {};
    if (newPasswordRef.current.value) {
      if (confirmPasswordRef.current.value !== newPasswordRef.current.value) {
        error.confirmPwError = "Mật khẩu xác nhận không khớp!";
      }
    }
    if (Object.keys(error).length) {
      setErrorMessage({
        ...errorMessage,
        ...error
      });
    } else {
      handleChangePassword();
    }
  }
  return (
    <>
      <ContentSection>
        <ContentSectionTitle label={"Thay đổi mật khẩu"} />
        <ContentSectionMain>
          <form onSubmit={handleSubmit}>
            <div className={cx("ContactInfo__Content")}>
              <div className={cx("UpdatePassword__Half")}>
                <aside className={cx("Label__Content")}>
                  <label className={cx("Lable__Title")}>
                    Mật khẩu cũ
                  </label>
                </aside>
                <div className={cx("Input__Container")}>
                  <TextFieldContainer className={"aries-textfield"}>
                    <TextFieldInput name="password" ariaLabel="Mật khẩu cũ"
                      type={"password"}
                      isRequired
                      // value={verifyCode}
                      ref={passwordRef}
                      onChange={() => {
                        setErrorMessage({
                          ...errorMessage,
                          pwError: ""
                        })
                      }}
                      placeholder={"Mật khẩu cũ"} />
                    <TextFieldLabel>
                      Mật khẩu cũ
                    </TextFieldLabel>
                  </TextFieldContainer>
                  <Paragraph color="#EC272B"
                    className={cx("aries-typography-paragraph", "FieldError")}>
                    {errorMessage.pwError}
                  </Paragraph>
                </div>
              </div>
              <div className={cx("UpdatePassword__Half")}>
                <aside className={cx("Label__Content")}>
                  <label className={cx("Lable__Title")}>
                    Mật khẩu mới
                  </label>
                </aside>
                <div className={cx("Input__Container")}>
                  <TextFieldContainer className={"aries-textfield"}>
                    <TextFieldInput name="password" ariaLabel="Mật khẩu mới"
                      type={"password"}
                      isRequired
                      // value={verifyCode}
                      ref={newPasswordRef}
                      onChange={() => {
                        setErrorMessage({
                          ...errorMessage,
                          newPwError: ""
                        })
                      }}
                      placeholder={"Mật khẩu mới"} />
                    <TextFieldLabel>
                      Mật khẩu mới
                    </TextFieldLabel>
                  </TextFieldContainer>
                  <Paragraph color="#EC272B"
                    className={cx("aries-typography-paragraph", "FieldError")}>
                    {errorMessage.newPwError}
                  </Paragraph>
                </div>
              </div>
              <div className={cx("UpdatePassword__Half")}>
                <aside className={cx("Label__Content")}>
                  <label className={cx("Lable__Title")}>
                    Xác nhận mật khẩu mới
                  </label>
                </aside>
                <div className={cx("Input__Container")}>
                  <TextFieldContainer className={"aries-textfield"}>
                    <TextFieldInput name="password" ariaLabel="Xác nhận mật khẩu mới"
                      type={"password"}
                      isRequired
                      // value={verifyCode}
                      ref={confirmPasswordRef}
                      onBlur={handleCheckConfirm}
                      onChange={() => {
                        setErrorMessage({
                          ...errorMessage,
                          confirmPwError: ""
                        })
                      }}
                      placeholder={"Xác nhận mật khẩu mới"} />
                    <TextFieldLabel>
                      Xác nhận mật khẩu mới
                    </TextFieldLabel>
                  </TextFieldContainer>
                  <Paragraph color="#EC272B"
                    className={cx("aries-typography-paragraph", "FieldError")}>
                    {errorMessage.confirmPwError}
                  </Paragraph>
                </div>
              </div>
              <div className={cx("UpdatePassword__Half")}>
                <aside className={cx("Label__Content")}>
                  <label className={cx("Lable__Title")}></label>
                </aside>
                <div className={cx("Input__Container")}>
                  {/* <button>Đổi mật khẩu</button> */}
                  <GhostBtnContainer>
                    <GhostBtn type={"submit"}>
                      Đổi mật khẩu
                    </GhostBtn>
                  </GhostBtnContainer>
                </div>
              </div>
            </div>
          </form>
        </ContentSectionMain>
      </ContentSection>
    </>
  )
}

export default ChangePasswordPage;

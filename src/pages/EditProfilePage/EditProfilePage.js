import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import styles from "./EditProfilePage.module.scss";
import {
  ContentSection,
  ContentSectionMain,
  ContentSectionTitle
} from "../../components/Shared";
import {
  TextFieldContainer,
  TextFieldInput,
  TextFieldLabel
} from "../../components/TextFieldStyle";
import { Paragraph } from "../../components/ParagraphStyle";
import { selectAccessToken, selectRefreshToken, selectUser } from "../../redux/selector";
import { GhostBtn, GhostBtnContainer } from "../../components/ButtonStyle";
import { ProfileInfo, ProfileName, ProfilePictureContainer, ProfilePictureContent } from "../../components/UserProfile";
import { createAxiosJwt, path } from "../../utils/axiosAPI";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function EditProfilePage() {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const refressToken = useSelector(selectRefreshToken);
  const currentUser = useSelector(selectUser);
  const [newAvatar, setAvatar] = useState();
  const uploadRef = useRef();
  const [errorMessage, setErrorMessage] = useState({
    nameError: "",
    emailError: "",
    phoneError: ""
  });
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const handleUploadFile = () => {
    uploadRef.current.value = "";
    uploadRef.current.click();
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    console.log(file);
    setAvatar(file);
  }
  const editProfile = async () => {
    console.log("file:", newAvatar);
    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("phone", phoneRef.current.value);
    formData.append("avatar", newAvatar);
    const axiosInstance = createAxiosJwt(accessToken, refressToken, dispatch);
    try {
      const res = await axiosInstance.patch(path.editProfile, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data"
        }
      })
      console.log(res);
      if (res.data.isSuccess) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      if (!error.response.data.isSuccess) {
        toast.error(error.response.data.message);
      }
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    editProfile();
  }
  useEffect(() => {
    return () => {
      newAvatar && URL.revokeObjectURL(newAvatar.preview);
    }
  }, [newAvatar])
  return (
    <ContentSection>
      <ContentSectionTitle label={"Chỉnh sửa thông tin"} />
      <ContentSectionMain>
        <form onSubmit={handleSubmit}>
          <div className={cx("ContactInfo__Content")}>
            <div className={cx("UpdatePassword__Half")}>
              <aside className={cx("Label__Content")}>
                <ProfilePictureContainer>
                  <ProfilePictureContent>
                    {
                      newAvatar ?
                        <img alt={currentUser.username}
                          src={newAvatar.preview} /> :
                        <img alt={currentUser.username}
                          src={
                            currentUser.avatar ?
                              `${process.env.REACT_APP_BASE_URL}image/${currentUser.avatar}` :
                              "/static/images/defaultUser.webp"} />
                    }
                  </ProfilePictureContent>
                </ProfilePictureContainer>
              </aside>
              <div className={cx("Input__Container")}>
                <ProfileInfo>
                  <ProfileName>
                    {currentUser.username}
                  </ProfileName>
                </ProfileInfo>
                <div className={cx("Uploader")}>
                  <span
                    onClick={handleUploadFile} >
                    Thay đổi ảnh đại diện
                  </span>
                </div>
                <input ref={uploadRef} type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={handleFileChange}
                  style={{ display: "none" }} />
              </div>
            </div>
            <div className={cx("UpdatePassword__Half")}>
              <aside className={cx("Label__Content")}>
                <label className={cx("Lable__Title")}>
                  Tên
                </label>
              </aside>
              <div className={cx("Input__Container")}>
                <TextFieldContainer className={"aries-textfield"}>
                  <TextFieldInput name="password" ariaLabel="Tên"
                    isRequired
                    defaultValue={currentUser.name}
                    ref={nameRef}
                    onChange={() => {
                      setErrorMessage({
                        ...errorMessage,
                        nameError: ""
                      })
                    }}
                    placeholder={"Tên"} />
                  <TextFieldLabel>
                    Tên
                  </TextFieldLabel>
                </TextFieldContainer>
                <Paragraph color="#EC272B"
                  className={cx("aries-typography-paragraph", "FieldError")}>
                  {errorMessage.nameError}
                </Paragraph>
              </div>
            </div>

            <div className={cx("UpdatePassword__Half")}>
              <aside className={cx("Label__Content")}>
                <label className={cx("Lable__Title")}>
                  Email
                </label>
              </aside>
              <div className={cx("Input__Container")}>
                <TextFieldContainer className={"aries-textfield"}>
                  <TextFieldInput name="password" ariaLabel="Email"
                    type={"email"}
                    isRequired
                    defaultValue={currentUser.email}
                    ref={emailRef}
                    onChange={() => {
                      setErrorMessage({
                        ...errorMessage,
                        emailError: ""
                      })
                    }}
                    placeholder={"Email"} />
                  <TextFieldLabel>
                    Email
                  </TextFieldLabel>
                </TextFieldContainer>
                <Paragraph color="#EC272B"
                  className={cx("aries-typography-paragraph", "FieldError")}>
                  {errorMessage.emailError}
                </Paragraph>
              </div>
            </div>

            <div className={cx("UpdatePassword__Half")}>
              <aside className={cx("Label__Content")}>
                <label className={cx("Lable__Title")}>
                  Số điện thoại
                </label>
              </aside>
              <div className={cx("Input__Container")}>
                <TextFieldContainer className={"aries-textfield"}>
                  <TextFieldInput name="password" ariaLabel="Số điện thoại"
                    isRequired
                    defaultValue={currentUser.phone}
                    ref={phoneRef}
                    onChange={() => {
                      setErrorMessage({
                        ...errorMessage,
                        phoneError: ""
                      })
                    }}
                    placeholder={"Số điện thoại"} />
                  <TextFieldLabel>
                    Số điện thoại
                  </TextFieldLabel>
                </TextFieldContainer>
                <Paragraph color="#EC272B"
                  className={cx("aries-typography-paragraph", "FieldError")}>
                  {errorMessage.phoneError}
                </Paragraph>
              </div>
            </div>

            <div className={cx("UpdatePassword__Half")}>
              <aside className={cx("Label__Content")}>
                <label className={cx("Lable__Title")}></label>
              </aside>
              <div className={cx("Input__Container")}>
                <GhostBtnContainer>
                  <GhostBtn type={"submit"}>
                    Lưu
                  </GhostBtn>
                </GhostBtnContainer>
              </div>
            </div>
          </div>
        </form>
      </ContentSectionMain>
    </ContentSection>
  )
}

export default EditProfilePage;

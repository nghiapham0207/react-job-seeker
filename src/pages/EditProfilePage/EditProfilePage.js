import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import styles from "./EditProfilePage.module.scss";
import { ContentSection, ContentSectionMain, ContentSectionTitle } from "../../components/Shared";
import { TextFieldContainer, TextFieldInput, TextFieldLabel } from "../../components/TextFieldStyle";
import { Paragraph } from "../../components/ParagraphStyle";
import { selectAccessToken, selectRefreshToken, selectUser } from "../../redux/selector";
import { GhostBtn, GhostBtnContainer } from "../../components/ButtonStyle";
import { ProfileInfo, ProfileName, ProfilePictureContainer, ProfilePictureContent } from "../../components/UserProfile";
import { createAxiosJwt, path } from "../../utils/axiosAPI";
import { toast } from "react-toastify";
import { getUser } from "../../services/authService";
import { getImageUrl } from "../../utils/helpers";
import { phoneRegex } from "../../utils/regex";
import { updateUser } from "../../redux/userSlice";

const cx = classNames.bind(styles);

function EditProfilePage() {
	const dispatch = useDispatch();
	const accessToken = useSelector(selectAccessToken);
	const refressToken = useSelector(selectRefreshToken);
	const currentUser = useSelector(selectUser);
	const [newAvatar, setNewAvatar] = useState();
	const uploadRef = useRef();
	const [errorMessage, setErrorMessage] = useState({
		name: "",
		email: "",
		phone: "",
	});
	const nameRef = useRef();
	const emailRef = useRef();
	const phoneRef = useRef();
	const handleUploadFile = () => {
		uploadRef.current.value = "";
		uploadRef.current.click();
	};
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		file.preview = URL.createObjectURL(file);
		setNewAvatar(file);
	};
	const editProfile = async () => {
		const hasErrors = {};
		if (!phoneRegex.test(phoneRef.current.value.trim())) {
			hasErrors.phone = "Số điện thoại không đúng định dạng! Ví dụ: 0334569829";
		}
		if (Object.keys(hasErrors).length) {
			setErrorMessage(hasErrors);
		} else {
			setErrorMessage({});
			const formData = new FormData();
			formData.append("name", nameRef.current.value);
			formData.append("email", emailRef.current.value);
			formData.append("phone", phoneRef.current.value);
			formData.append("avatar", newAvatar);
			const axiosInstance = createAxiosJwt(accessToken, refressToken, dispatch);
			try {
				const res = await axiosInstance.put(path.editProfile, formData, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "multipart/form-data",
					},
				});
				if (res.data.isSuccess) {
					toast.success(res.data.message, { autoClose: 1000 });
					// getUser(accessToken, refressToken, dispatch);
					const resUser = await getUser(accessToken, refressToken, dispatch);
					if (resUser.isSuccess) {
						dispatch(
							updateUser({
								_id: resUser.data._id,
								name: resUser.data.name,
								avatar: resUser.data.avatar,
								phone: resUser.data.phone,
								email: resUser.data.email,
								username: resUser.data.username,
								savedJobs: resUser.data.jobFavourite,
							}),
						);
					}
				}
			} catch (error) {
				console.log(error);
				if (!error.response.data.isSuccess) {
					toast.error(error.response.data.message);
				}
			}
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		editProfile();
	};
	useEffect(() => {
		return () => {
			newAvatar && URL.revokeObjectURL(newAvatar.preview);
		};
	}, [newAvatar]);
	return (
		<ContentSection>
			<ContentSectionTitle label={"Chỉnh sửa thông tin"} />
			<ContentSectionMain>
				<form onSubmit={handleSubmit}>
					<div className={cx("ContactInfo__Content")}>
						{/* <div className={cx("UpdatePassword__Half")}> */}
						<div className={cx("ProfileWrapper")}>
							<aside className={cx("Label__Content")}>
								<ProfilePictureContainer>
									<ProfilePictureContent>
										{newAvatar ? (
											<img alt={currentUser.username} src={newAvatar.preview} />
										) : (
											<img
												alt="default user"
												src={currentUser.avatar ? getImageUrl(currentUser) : "/static/images/defaultUser.webp"}
												onError={(e) => {
													e.target.src = "/static/images/defaultUser.webp";
												}}
											/>
										)}
									</ProfilePictureContent>
								</ProfilePictureContainer>
							</aside>
							<div className={cx("Input__Container")}>
								<ProfileInfo>
									<ProfileName>{currentUser.username}</ProfileName>
								</ProfileInfo>
								<div className={cx("Uploader")}>
									<span onClick={handleUploadFile}>Thay đổi ảnh đại diện</span>
								</div>
								<input
									ref={uploadRef}
									type="file"
									accept="image/png, image/jpg, image/jpeg"
									placeholder="placeholder"
									onChange={handleFileChange}
									style={{ display: "none" }}
								/>
							</div>
						</div>
						<div className={cx("UpdatePassword__Half")}>
							<aside className={cx("Label__Content")}>
								<label className={cx("Lable__Title")}>Tên</label>
							</aside>
							<div className={cx("Input__Container")}>
								<TextFieldContainer className={"aries-textfield"}>
									<TextFieldInput
										name="password"
										ariaLabel="Tên"
										isRequired
										defaultValue={currentUser.name}
										ref={nameRef}
										onChange={() => {
											setErrorMessage({
												...errorMessage,
												name: "",
											});
										}}
										placeholder={"Tên"}
									/>
									<TextFieldLabel>Tên</TextFieldLabel>
								</TextFieldContainer>
								<Paragraph color="#EC272B" className={cx("aries-typography-paragraph", "FieldError")}>
									{errorMessage.name}
								</Paragraph>
							</div>
						</div>

						<div className={cx("UpdatePassword__Half")}>
							<aside className={cx("Label__Content")}>
								<label className={cx("Lable__Title")}>Email</label>
							</aside>
							<div className={cx("Input__Container")}>
								<TextFieldContainer className={"aries-textfield"}>
									<TextFieldInput
										name="password"
										ariaLabel="Email"
										type={"email"}
										isRequired
										defaultValue={currentUser.email}
										ref={emailRef}
										onChange={() => {
											setErrorMessage({
												...errorMessage,
												email: "",
											});
										}}
										placeholder={"Email"}
									/>
									<TextFieldLabel>Email</TextFieldLabel>
								</TextFieldContainer>
								<Paragraph color="#EC272B" className={cx("aries-typography-paragraph", "FieldError")}>
									{errorMessage.email}
								</Paragraph>
							</div>
						</div>

						<div className={cx("UpdatePassword__Half")}>
							<aside className={cx("Label__Content")}>
								<label className={cx("Lable__Title")}>Số điện thoại</label>
							</aside>
							<div className={cx("Input__Container")}>
								<TextFieldContainer className={"aries-textfield"}>
									<TextFieldInput
										name="password"
										ariaLabel="Số điện thoại"
										isRequired
										defaultValue={currentUser.phone}
										ref={phoneRef}
										onChange={() => {
											setErrorMessage({
												...errorMessage,
												phone: "",
											});
										}}
										placeholder={"Số điện thoại"}
									/>
									<TextFieldLabel>Số điện thoại</TextFieldLabel>
								</TextFieldContainer>
								<Paragraph color="#EC272B" className={cx("aries-typography-paragraph", "FieldError")}>
									{errorMessage.phone}
								</Paragraph>
							</div>
						</div>

						<div className={cx("UpdatePassword__Half")}>
							<aside className={cx("Label__Content")}>
								<label className={cx("Lable__Title")}></label>
							</aside>
							<div className={cx("Input__Container")}>
								<GhostBtnContainer>
									<GhostBtn type={"submit"}>Lưu</GhostBtn>
								</GhostBtnContainer>
							</div>
						</div>
					</div>
				</form>
			</ContentSectionMain>
		</ContentSection>
	);
}

export default EditProfilePage;

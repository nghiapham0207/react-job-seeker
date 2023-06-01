import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";

import styles from "./ResetPasswordPage.module.scss";
import { Title } from "../../components/TitleStyle";
import { TextFieldContainer, TextFieldInput, TextFieldLabel } from "../../components/TextFieldStyle";
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
	const [errors, setErrors] = useState({
		verifyCode: "",
		password: "",
		pwConfirm: "",
	});
	const verifyCodeRef = useRef();
	const passwordRef = useRef();
	const pwConfirmRef = useRef();
	const handleSubmit = (e) => {
		e.preventDefault();
		const hasErrors = {};
		if (!verifyCodeRef.current.value.trim()) {
			hasErrors.verifyCode = "Bắt buộc!";
		}
		if (!passwordRef.current.value) {
			hasErrors.password = "Bắt buộc!";
		} else if (passwordRef.current.value.length < 6) {
			hasErrors.password = "Mật khẩu tối thiểu 6 ký tự!";
		}
		if (!pwConfirmRef.current.value) {
			hasErrors.pwConfirm = "Bắt buộc!";
		} else if (pwConfirmRef.current.value !== passwordRef.current.value) {
			hasErrors.pwConfirm = "Mật khẩu xác nhận không khớp!";
		}
		if (!Object.keys(hasErrors).length) {
			setErrors({});
			const fetchApi = async () => {
				try {
					const res = await put(path.resetPassword, {
						newPassword: passwordRef.current.value,
						confirmPasswordCode: verifyCodeRef.current.value,
						email: email,
					});
					toast.success(res.message);
					navigate(config.routes.home);
				} catch (error) {
					toast.error(error.response.data.message);
				}
			};
			fetchApi();
		} else {
			setErrors(hasErrors);
		}
	};
	useEffect(() => {
		if (!email) {
			navigate(config.routes.forgotPassword);
		}
	});
	return (
		<div className={cx("GlintContainer")}>
			<section className={cx("Section")}>
				<Title as="h3" className={cx("aries-typography-title", "Title")}>
					Đặt lại mật khẩu của bạn
				</Title>
				<div className={cx("FormContainer")}>
					<form
						// noValidate
						onSubmit={handleSubmit}>
						<TextFieldContainer className={"aries-textfield"}>
							<TextFieldInput
								name="password"
								ariaLabel="Mã xác nhận"
								ref={verifyCodeRef}
								onChange={() => {
									setErrors({
										...errors,
										verifyCode: "",
									});
								}}
								placeholder={"Mã xác nhận"}
							/>
							<TextFieldLabel>Mã xác nhận</TextFieldLabel>
						</TextFieldContainer>
						<Paragraph color="#EC272B" className={cx("aries-typography-paragraph", "FieldError")}>
							{errors.verifyCode}
						</Paragraph>
						<br />
						<TextFieldContainer className={"aries-textfield"}>
							<TextFieldInput
								type="password"
								name="password"
								ariaLabel="Mật khẩu"
								ref={passwordRef}
								onChange={() => {
									setErrors({
										...errors,
										password: "",
									});
								}}
								placeholder={"Địa chỉ email"}
							/>
							<TextFieldLabel>Mật khẩu mới</TextFieldLabel>
						</TextFieldContainer>
						<Paragraph color="#EC272B" className={cx("aries-typography-paragraph", "FieldError")}>
							{errors.password}
						</Paragraph>
						<br />
						<TextFieldContainer className={"aries-textfield"}>
							<TextFieldInput
								type="password"
								name="password"
								ariaLabel="Mật khẩu"
								ref={pwConfirmRef}
								onChange={() => {
									setErrors({
										...errors,
										pwConfirm: "",
									});
								}}
								placeholder={"Địa chỉ email"}
							/>
							<TextFieldLabel>Xác nhận mật khẩu</TextFieldLabel>
						</TextFieldContainer>
						<Paragraph color="#EC272B" className={cx("aries-typography-paragraph", "FieldError")}>
							{errors.pwConfirm}
						</Paragraph>
						<SolidBtnContainer className={cx("aries-solid-btn", "SubmitBtn")}>
							<SolidButton type="submit" block className={cx("solid-btn-content")}>
								Gửi
							</SolidButton>
						</SolidBtnContainer>
					</form>
				</div>
			</section>
		</div>
	);
}

export default ResetPasswordPage;

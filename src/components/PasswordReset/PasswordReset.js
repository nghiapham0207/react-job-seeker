import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { toast } from "react-toastify";

import styles from "./PasswordReset.module.scss";
import { TextFieldContainer, TextFieldInput, TextFieldLabel } from "../TextFieldStyle";
import Paragraph from "../ParagraphStyle/Paragraph";
import { GhostBtn, GhostBtnContainer, SolidBtnContainer, SolidButton } from "../ButtonStyle";
import Title from "../TitleStyle/Title";
import config from "../../config";
import { path, post } from "../../utils/axiosAPI";

const cx = classNames.bind(styles);

function PasswordReset() {
	const emailRef = useRef(null);
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!email) {
			setEmailError("Địa chỉ e-mail là bắt buộc");
			emailRef.current.focus();
		} else {
			// call api here
			const fetchApi = async () => {
				const idToast = toast.loading("Vui lòng đợi một lát!");
				try {
					const res = await post(path.forgotPassword, {
						email: email,
					});
					toast.update(idToast, {
						render: res.message,
						closeButton: true,
						autoClose: 3000,
						type: "success",
						isLoading: false,
					});
					navigate(config.routes.resetPassword, {
						state: {
							email: email,
						},
					});
				} catch (error) {
					toast.update(idToast, {
						render: error.response.data.message,
						closeButton: true,
						autoClose: 3000,
						type: "error",
						isLoading: false,
					});
					console.log(error);
				}
			};
			fetchApi();
		}
	};
	return (
		<div className={cx("GlintContainer")}>
			<section className={cx("Section")}>
				<Title as="h3" className={cx("aries-typography-title", "Title")}>
					Bạn quên mật khẩu?
				</Title>
				<div className={cx("FormContainer")}>
					<form
						// noValidate
						onSubmit={handleSubmit}>
						<TextFieldContainer className={"aries-textfield"}>
							<TextFieldInput
								type="email"
								name="email"
								ariaLabel="Địa chỉ email"
								value={email}
								ref={emailRef}
								onChange={(e) => {
									setEmail(e.target.value);
									setEmailError("");
								}}
								placeholder={"Địa chỉ email"}
							/>
							<TextFieldLabel>Địa chỉ email</TextFieldLabel>
						</TextFieldContainer>
						<Paragraph color="#EC272B" className={cx("aries-typography-paragraph", "FieldError")}>
							{emailError}
						</Paragraph>
						<Paragraph color="#000000" className={cx("aries-typography-paragraph", "FieldDescription")}>
							Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu của bạn.
						</Paragraph>
						<SolidBtnContainer className={cx("aries-solid-btn", "SubmitBtn")}>
							<SolidButton type="submit" block className={cx("solid-btn-content")}>
								Gửi email
							</SolidButton>
						</SolidBtnContainer>
						<GhostBtnContainer className={cx("aries-ghostbtn", "SubmitBtn")}>
							<GhostBtn
								type="button"
								className={cx("ghostbtn-content")}
								onClick={() => {
									navigate(-1);
								}}>
								Back
							</GhostBtn>
						</GhostBtnContainer>
					</form>
				</div>
			</section>
		</div>
	);
}

export default PasswordReset;

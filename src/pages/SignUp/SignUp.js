import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import classNames from "classnames/bind";

import styles from "./SignUp.module.scss";
import { useDocumentTitle } from "../../hooks";
import { ErrorMessage, InputWrapper } from "../../components/InputComponent";
import AlertsErrorMessage from "../../components/AlertsErrorMessage";
import { useEffect, useState } from "react";
import { post } from "../../utils/axiosAPI";
import { login } from "../../services/authService";
import { useUserActions } from "../../contexts/userActionsContext";
import config from "../../config";
import { selectUser } from "../../redux/selector";
import { phoneRegex, usernameRegex } from "../../utils/regex";

const cx = classNames.bind(styles);

function SignUp() {
	useDocumentTitle("Sign-up");
	const currentUser = useSelector(selectUser);
	const navigate = useNavigate();
	const UserActionsContext = useUserActions();
	const { handleShowLogin } = UserActionsContext;
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		fullName: "",
		username: "",
		password: "",
		numberPhone: "",
		email: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({
		fullName: "",
		username: "",
		password: "",
		numberPhone: "",
		email: "",
		confirmPassword: "",
	});
	const [resError, setResError] = useState("");
	const validateForm = (formData) => {
		const errs = {};
		if (!formData.fullName) {
			errs.fullName = "Vui lòng nhập họ tên!";
		}
		if (!formData.numberPhone) {
			errs.numberPhone = "Vui lòng nhập số điện thoại!";
		} else if (!phoneRegex.test(formData.numberPhone)) {
			errs.numberPhone = "Số điện thoại không đúng định dạng! Ví dụ: 0234242524";
		}
		if (!formData.email) {
			errs.email = "Vui lòng nhập email";
		}
		if (!formData.username) {
			errs.username = "Vui lòng nhập tên đăng nhập";
		} else if (!usernameRegex.test(formData.username)) {
			errs.username = "Tên đăng nhập chỉ chứa ký tự [a-z] [0-9]";
		}
		if (!formData.password) {
			errs.password = "Vui lòng nhập mật khẩu";
		} else if (formData.password.length < 6) {
			errs.password = "Mật khẩu tối thiểu 6 ký tự!";
		}
		if (formData.confirmPassword !== formData.password) {
			errs.confirmPassword = "Mật khẩu xác nhận không khớp!";
		}
		return errs;
	};
	const register = async (formData) => {
		const idToast = toast.loading("Đang xử lý!");
		try {
			const res = await post("/auth/register", {
				name: formData.fullName,
				avatar: null,
				phone: formData.numberPhone,
				email: formData.email,
				password: formData.password,
				role: "user",
				username: formData.username,
			});
			// toast.success(res.message);
			toast.update(idToast, {
				render: res.message,
				closeButton: true,
				autoClose: 2000,
				type: "success",
				isLoading: false,
			});
			login(
				{
					username: formData.username,
					password: formData.password,
				},
				dispatch,
				navigate,
			);
			// navigate(config.routes.home);
			// handleShowLogin();
		} catch (error) {
			toast.update(idToast, {
				render: "Đăng ký không thành công!",
				closeButton: true,
				autoClose: 2000,
				type: "error",
				isLoading: false,
			});
			setResError(error.response.data.message);
		} finally {
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const errs = validateForm(formData);
		console.log(errs);
		if (Object.keys(errs).length === 0) {
			setErrors({});
			// call api here
			register(formData);
		} else {
			setErrors(errs);
			setResError("");
		}
	};
	const handleInput = (e) => {
		const { name, value } = e.target;
		setErrors({ ...errors, [name]: "" });
		setFormData({
			...formData,
			[name]: value,
		});
	};
	useEffect(() => {
		if (currentUser) {
			navigate(config.routes.job);
		}
	}, [currentUser, navigate]);
	return (
		<section className={cx("global__Background")}>
			<div className={cx("global__TitleWrapper")}>
				<h1 className={cx("TitleStyles__Title", "SignUpPage__Title")}>
					Cùng tạo hồ sơ <br />
					<span className={cx("SignUpPage__Psychedelic")}>Glints</span> của bạn.
				</h1>
			</div>
			<div className={cx("signupWithEmail__SignUpWrapper", "SignUpEmailPage__SignUpWrapperExtend")}>
				<div className={cx("signupWithEmail__SignUpFormWrapper")}>
					<div>
						<form onSubmit={handleSubmit}>
							<section className={cx("signupWithEmail__SignUpContainer")}>
								<div className={cx("signupWithEmail__SignUpTwoCols")}>
									<div className={cx("signupWithEmail__FormWrapper")}>
										<InputWrapper
											name={"fullName"}
											id={"sign-up-form-full-name"}
											label={"Fullname"}
											value={formData.fullName}
											onChange={handleInput}
											valid={errors.fullName ? false : true}
										/>
										{errors.fullName && <ErrorMessage message={errors.fullName} />}
									</div>
									<div className={cx("signupWithEmail__FormWrapper")}>
										<InputWrapper
											name={"username"}
											id={"sign-up-form-username"}
											label={"Username"}
											value={formData.username}
											onChange={handleInput}
											valid={errors.username ? false : true}
										/>
										{errors.username && <ErrorMessage message={errors.username} />}
									</div>
								</div>
								<div className={cx("signupWithEmail__SignUpTwoCols")}>
									<div className={cx("signupWithEmail__FormWrapper")}>
										<InputWrapper
											name={"email"}
											type="email"
											id={"sign-up-form-email"}
											label={"Email"}
											value={formData.email}
											onChange={handleInput}
											valid={errors.email ? false : true}
										/>
										{errors.email && <ErrorMessage message={errors.email} />}
									</div>
									<div className={cx("signupWithEmail__FormWrapper")}>
										<InputWrapper
											type="password"
											name={"password"}
											id={"sign-up-form-password"}
											label={"Password"}
											value={formData.password}
											onChange={handleInput}
											valid={errors.password ? false : true}
										/>
										{errors.password && <ErrorMessage message={errors.password} />}
									</div>
								</div>
								<div className={cx("signupWithEmail__SignUpTwoCols")}>
									<div className={cx("signupWithEmail__FormWrapper")}>
										<InputWrapper
											name={"numberPhone"}
											id={"sign-up-form-number-phone"}
											label={"Number Phone"}
											type="tel"
											value={formData.numberPhone}
											onChange={handleInput}
											valid={errors.numberPhone ? false : true}
										/>
										{errors.numberPhone && <ErrorMessage message={errors.numberPhone} />}
									</div>
									<div className={cx("signupWithEmail__FormWrapper")}>
										<InputWrapper
											name={"confirmPassword"}
											type="password"
											id={"sign-up-form-confirm-password"}
											label={"Confirm Password"}
											value={formData.confirmPassword}
											onChange={handleInput}
											valid={errors.confirmPassword ? false : true}
										/>
										{errors.confirmPassword && <ErrorMessage message={errors.confirmPassword} />}
									</div>
								</div>
								<div className={cx("signupWithEmail__SignUpTwoCols")}>{/* additional here */}</div>
							</section>
							{resError && (
								<AlertsErrorMessage messageHeader={resError}>
									{false && (
										<p>
											{/* Link login page or forgot password */}
											{"Tài khoản này đã tồn tại!"}
											{"Có lẽ bạn muốn "}
											<Link to="/" onClick={handleShowLogin}>
												đăng nhập
											</Link>
											{" hoặc "}
											<Link to={config.routes.forgotPassword}>lấy lại mật khẩu</Link>
											{" ?"}
										</p>
									)}
								</AlertsErrorMessage>
							)}
							<div className={cx("signupWithEmail__SubmitWrapper")}>
								<div className={cx("Checkbox__CheckboxWrapper")}>
									<input
										type="checkbox"
										placeholder="placeholder"
										defaultChecked
										className={cx("Checkbox__Input")}
										id="sign-up-form-send-me-updates"
									/>
									<label htmlFor="sign-up-form-send-me-updates" className="Checkbox__Label">
										<span>Cập nhật cho tôi thông tin về cơ hội nghề nghiệp mới nhất</span>
									</label>
								</div>
								<div className={cx("buttons__OverlappingBtn", "signupWithEmail__OverlappingBtnExt")}>
									<button type="submit" className={cx("signupWithEmail__BtnSubmit")}>
										<span>Đăng ký</span>
									</button>
								</div>
								<span>
									{"Bạn là nhà tuyển dụng? Hãy nhấn vào "}
									<a href="https://employers.glints.vn/" target="_blank" rel="noreferrer">
										<span>đây</span>
									</a>
								</span>
							</div>
						</form>
					</div>
					<div className={cx("signupWithEmail__LoginWithSocialMedia")}>{/* terms of use */}</div>
					<div className={cx("signupWithEmail__AlreadyHaveAccount")}>
						<label>Bạn đã có tài khoản Glints? </label>
						<Link
							onClick={handleShowLogin}
							className={cx("buttons__DefaultBtn", "buttons__GhostBtn", "signupWithEmail__GhostBtnExt")}>
							<span>Đăng nhập</span>
						</Link>
					</div>
				</div>
			</div>
			<div className={cx("OnboardingFooter__StyledFooter")}>{/* Footer of form here */}</div>
		</section>
	);
}

export default SignUp;

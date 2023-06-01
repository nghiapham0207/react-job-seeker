import classNames from "classnames/bind";

import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

function Footer() {
	return (
		<div className={cx("Outer")}>
			<div className={cx("Inner")}>
				<div className={cx("CompanyInfo")}>
					<a href="/vn">
						<div className={cx("BrandContainer", "Logo")} role="presentation" tabIndex={0}>
							<img
								className={cx("BrandImage")}
								src="/static/images/glints-logo-white.svg"
								alt="Glints Logo"
								tabIndex={-1}
							/>
						</div>
					</a>
					<h4 className={cx("RegionalHeading")}>Glints Asia Pacific</h4>
					<nav className={cx("Regional")}>
						<a href="/sg" target="_blank" rel="noreferrer">
							<img src="/static/images/singapore.png" alt="Singapore" />
						</a>
						<a href="/my" target="_blank" rel="noreferrer">
							<img src="/static/images/malaysia.png" alt="Malaysia" />
						</a>
						<a href="/id" target="_blank" rel="noreferrer">
							<img src="/static/images/indonesia.png" alt="Indonesia" />
						</a>
						<a href="/vn" target="_blank" rel="noreferrer">
							<img src="/static/images/vietnam.png" alt="Vietnam" />
						</a>
						<a href="/tw" target="_blank" rel="noreferrer">
							<img src="/static/images/taiwan.png" alt="Taiwan" />
						</a>
					</nav>
					<p className={cx("Paragraph", "SmallWhiteText", "About")} color="#FFFFFF">
						Glints là hệ sinh thái nhân sự lớn nhất tại khu vực Đông Nam Á. Sứ mệnh của chúng tôi là hỗ trợ cho 120
						triệu nhân tài trong khu vực phát triển sự nghiệp của họ, cũng như giúp cho tổ chức tuyển được nhân sự phù
						hợp ở bất kỳ nơi đâu tại khu vực Đông Nam Á. Được chính thức thành lập tại Singapore vào năm 2015, Glints đã
						hỗ trợ hơn 3 triệu nhân tài và hơn 50.000 tổ chức thành công trong việc phát huy tối đa tiềm năng nhân lực
						của họ. Chúng tôi dẫn đầu trong lĩnh vực phát triển nguồn vốn nhân lực với tư cách là startup phát triển
						nhanh nhất trong thị trường phát triển sự nghiệp và tuyển dụng nhân tài. Cho đến thời điểm hiện tại, Glints
						đã có mặt tại Indonesia, Malaysia, Singapore, Việt Nam và Đài Loan.
					</p>
					<nav className={cx("Social")}>
						<a
							title="facebook"
							href="https://facebook.com/glintsvietnam/"
							target="_blank"
							rel="nofollow noopener noreferrer">
							<svg
								data-testid="icon-svg"
								className="VerticalCenteredSvg"
								width="1em"
								height="1em"
								fill="#FFFFFF"
								viewBox="0 0 100 100">
								<path d="M36.375 19.367v13.768H26V49.97h10.375V100h21.312V49.972H71.99s1.34-8.073 1.989-16.9h-16.21v-11.51c0-1.72 2.324-4.035 4.62-4.035H74V0H58.212C35.848-.001 36.375 16.851 36.375 19.367z" />
							</svg>
						</a>
						<a
							title="twitter"
							href="https://twitter.com/GlintsSingapore"
							target="_blank"
							rel="nofollow noopener noreferrer">
							<svg
								data-testid="icon-svg"
								className="VerticalCenteredSvg"
								width="1em"
								height="1em"
								fill="#FFFFFF"
								viewBox="0 0 100 100">
								<path d="M100 18.702a40.666 40.666 0 0 1-11.78 3.261 20.761 20.761 0 0 0 9.018-11.45 41.121 41.121 0 0 1-13.035 5.029C80.46 11.51 75.136 9 69.23 9 57.9 9 48.716 18.273 48.716 29.703c0 1.622.18 3.205.53 4.719-17.046-.864-32.162-9.11-42.279-21.637a20.701 20.701 0 0 0-2.774 10.408 20.75 20.75 0 0 0 9.123 17.234 20.37 20.37 0 0 1-9.292-2.599v.259c0 10.03 7.074 18.4 16.453 20.306-1.718.467-3.53.725-5.405.725-1.325 0-2.606-.132-3.862-.384 2.612 8.232 10.186 14.218 19.16 14.382a40.913 40.913 0 0 1-25.477 8.85c-1.656 0-3.287-.1-4.893-.283C9.08 87.568 19.859 91 31.444 91c37.737 0 58.364-31.554 58.364-58.918L89.74 29.4A41.18 41.18 0 0 0 100 18.7z" />
							</svg>
						</a>
						<a
							title="instagram"
							href="https://www.instagram.com/glints.vn/"
							target="_blank"
							rel="nofollow noopener noreferrer">
							<svg
								data-testid="icon-svg"
								className="VerticalCenteredSvg"
								width="1em"
								height="1em"
								fill="#FFFFFF"
								viewBox="0 0 100 100">
								<g>
									<path d="M68.75 0h-37.5C13.994 0 0 13.994 0 31.25v37.5C0 86.006 13.994 100 31.25 100h37.5C86.006 100 100 86.006 100 68.75v-37.5C100 13.994 86.006 0 68.75 0zm21.875 68.75c0 12.063-9.813 21.875-21.875 21.875h-37.5c-12.063 0-21.875-9.813-21.875-21.875v-37.5c0-12.063 9.813-21.875 21.875-21.875h37.5c12.063 0 21.875 9.813 21.875 21.875v37.5z" />{" "}
									<path d="M52 26c-14.358 0-26 11.642-26 26 0 14.359 11.642 26 26 26 14.359 0 26-11.641 26-26 0-14.358-11.641-26-26-26zm0 42.25c-8.957 0-16.25-7.293-16.25-16.25 0-8.964 7.293-16.25 16.25-16.25S68.25 43.036 68.25 52c0 8.957-7.293 16.25-16.25 16.25z" />
									<circle cx={77} cy={23} r={3} />
								</g>
							</svg>
						</a>
						<a
							title="linkedin"
							href="https://linkedin.com/company/glints"
							target="_blank"
							rel="nofollow noopener noreferrer">
							<svg
								data-testid="icon-svg"
								className="VerticalCenteredSvg"
								width="1em"
								height="1em"
								fill="#FFFFFF"
								viewBox="0 0 100 100">
								<path d="M100 60.639V97H78.558V63.057c0-8.534-3.091-14.334-10.85-14.334-5.933 0-9.433 3.927-10.996 7.706-.562 1.36-.733 3.267-.733 5.148v35.419h-21.42s.287-57.467 0-63.418h21.424v8.988c-.029.074-.091.136-.12.218h.12v-.218c2.863-4.32 7.934-10.476 19.321-10.476C89.438 32.09 100 41.152 100 60.639zM12.13 3C4.8 3 0 7.73 0 13.969c0 6.07 4.658 10.96 11.854 10.96h.13c7.49 0 12.133-4.89 12.133-10.96C23.97 7.73 19.475 3 12.129 3zM1.28 97h21.428V33.574H1.28V97z" />
							</svg>
						</a>
						<a title="email" href="mailto:hi@glints.com" target="_blank" rel="noreferrer">
							<svg
								data-testid="icon-svg"
								className="VerticalCenteredSvg"
								width="1em"
								height="1em"
								fill="#FFFFFF"
								viewBox="0 0 100 100">
								<path d="M86.768 8H13.232C5.936 8 0 14.11 0 21.618v56.764C0 85.89 5.936 92 13.232 92h73.536C94.064 92 100 85.89 100 78.382V21.618C100 14.11 94.064 8 86.768 8zm5.153 70.382c0 2.924-2.312 5.303-5.153 5.303H13.232c-2.841 0-5.153-2.38-5.153-5.303V21.618c0-2.924 2.312-5.303 5.153-5.303h73.536c2.841 0 5.153 2.38 5.153 5.303v56.764z M99.27 17.713a4.056 4.056 0 0 0-5.626-.987L50 47.086 6.356 16.726a4.055 4.055 0 0 0-5.626.987 3.998 3.998 0 0 0 .993 5.59l45.96 31.971A4.051 4.051 0 0 0 50 56c.81 0 1.62-.242 2.316-.726l45.96-31.97a3.998 3.998 0 0 0 .994-5.591z" />
							</svg>
						</a>
					</nav>
					<div className={cx("Paragraph", "SmallWhiteText", "Copyright")} color="#FFFFFF">
						© 2023&nbsp;
						<span className={cx("DisclaimerTitle6")}>CÔNG TY TNHH GLINTS VIỆT NAM</span>
						<p className={cx("DisclaimerPart")}>
							Mã số Doanh nghiệp: 0316168834 theo Giấy chứng nhận đăng ký doanh nghiệp do Sở Kế hoạch và Đầu tư Thành
							phố Hồ Chí Minh cấp lần đầu ngày 27/02/2020.
						</p>
						<p className={cx("DisclaimerPart")}>
							Địa chỉ: Tầng 6, Số 100, Đường Nguyễn Thị Minh Khai, Phường 06, Quận 3, Thành phố Hồ Chí Minh, Việt Nam
						</p>
						<p className={cx("DisclaimerPart")}>
							Email:&nbsp;
							<a href="mailto:sales-vn@glints.com">sales-vn@glints.com</a>
						</p>
						<p className={cx("DisclaimerPart")}>
							Hotline:&nbsp;
							<a href="tel:(028) 7100 3030">(028) 7100 3030</a>
						</p>
					</div>
				</div>
				<div className={cx("Sections0")}>
					<nav className={cx("Section1")}>
						<p className={cx("Paragraph", "SectionHeader2")} color="#FFFFFF">
							Công ty
						</p>
						<ul>
							<li className={cx("SectionListItem")}>
								<a href="/vn/about" rel="noreferrer" className={cx("ListItemAnchor")}>
									<span>Về chúng tôi</span>
								</a>
							</li>
							<li className={cx("SectionListItem")}>
								<a href="/vn/about/team" rel="noreferrer" className={cx("ListItemAnchor")}>
									<span>Đội ngũ lãnh đạo</span>
								</a>
							</li>
							<li className={cx("SectionListItem")}>
								<a href="/vn/blog/" target="_blank" rel="noreferrer" className={cx("ListItemAnchor")}>
									<span>Blog</span>
								</a>
							</li>
							<li className={cx("SectionListItem")}>
								<a href="/sg/inside/" target="_blank" rel="noreferrer" className={cx("ListItemAnchor")}>
									<span>Những điều thú vị tại Glints</span>
								</a>
							</li>
							<li className={cx("SectionListItem")}>
								<a href="https://tech.glints.com/" target="_blank" rel="noreferrer" className={cx("ListItemAnchor")}>
									<span>Tech Blog</span>
								</a>
							</li>
							<li className={cx("SectionListItem")}>
								<a href="/vn/careers" rel="noreferrer" className={cx("ListItemAnchor")}>
									<span>Cơ hội nghề nghiệp</span>
								</a>
							</li>
							<li className={cx("SectionListItem")}>
								<a
									href="https://security.glints.com/"
									target="_blank"
									rel="noreferrer"
									className={cx("ListItemAnchor")}>
									<span>Report Vulnerability</span>
								</a>
							</li>
							<li className={cx("SectionListItem")}>
								<a
									href="https://s3-ap-southeast-1.amazonaws.com/glints-dashboard/docs/terms-and-conditions-vn.pdf"
									target="_blank"
									rel="noreferrer"
									className={cx("ListItemAnchor")}>
									<span>Điều khoản sử dụng</span>
								</a>
							</li>
							<li className={cx("SectionListItem")}>
								<a
									href="https://s3-ap-southeast-1.amazonaws.com/glints-dashboard/docs/operation-regulation-vn.pdf"
									target="_blank"
									rel="noreferrer"
									className={cx("ListItemAnchor")}>
									<span>Quy Chế Hoạt Động Website Cung Cấp Dịch vụ TMĐT Glints.com/vn</span>
								</a>
							</li>
							<li className={cx("SectionListItem")}>
								<a
									href="https://s3-ap-southeast-1.amazonaws.com/glints-dashboard/docs/Information-security-policy-vn.pdf"
									target="_blank"
									rel="noreferrer"
									className={cx("ListItemAnchor")}>
									<span>Chính Sách Bảo Mật</span>
								</a>
							</li>
							<li className={cx("SectionListItem")}>
								<a
									href="https://s3-ap-southeast-1.amazonaws.com/glints-dashboard/docs/dispute-settlement-mechanism-vn.pdf"
									target="_blank"
									rel="noreferrer"
									className={cx("ListItemAnchor")}>
									<span>Cơ Chế Giải Quyết Các Tranh Chấp</span>
								</a>
							</li>
						</ul>
					</nav>
					<nav className={cx("Section1")}>
						<p className={cx("Paragraph", "SectionHeader2")} color="#FFFFFF">
							Dành cho người tìm việc
						</p>
						<ul>
							<li className={cx("SectionListItem")}>
								<a
									href="https://help.glints.com/hc/vi"
									target="_blank"
									rel="noreferrer"
									className={cx("ListItemAnchor")}>
									<span>Help Center</span>
								</a>
							</li>
							<li className={cx("SectionListItem")}>
								<a href="/vn/browse/location" className={cx("ListItemAnchor")}>
									<span>Việc làm theo Địa điểm</span>
								</a>
							</li>
							<li className={cx("SectionListItem")}>
								<a href="/vn/browse/company" className={cx("ListItemAnchor")}>
									<span>Việc làm theo Tên công ty tuyển dụng</span>
								</a>
							</li>
							<li className={cx("SectionListItem")}>
								<a href="/vn/browse/category" className={cx("ListItemAnchor")}>
									<span>Việc làm theo Ngành nghề</span>
								</a>
							</li>
							<li className={cx("SectionListItem")}>
								<a href="/vn/browse/job-role" className={cx("ListItemAnchor")}>
									<span>Việc làm theo Vị trí công việc</span>
								</a>
							</li>
							<li className={cx("SectionListItem")}>
								<a href="/vn/browse/query" className={cx("ListItemAnchor")}>
									<span>Việc làm được tìm kiếm nhiều nhất</span>
								</a>
							</li>
						</ul>
					</nav>
					<nav className={cx("Section1")}>
						<p className={cx("Paragraph", "SectionHeader2")} color="#FFFFFF">
							GIẢI PHÁP NHÂN SỰ
						</p>
						<ul>
							<li className={cx("SectionListItem")}>
								<a href="https://employers.glints.vn" target="_blank" rel="noreferrer" className={cx("ListItemAnchor")}>
									<span>Dành cho Nhà tuyển dụng</span>
								</a>
							</li>
							<li className={cx("SectionListItem")}>
								<a href="/vn" className={cx("ListItemAnchor")}>
									<span>Glints Platform</span>
								</a>
							</li>
							<li className={cx("SectionListItem")}>
								<a
									href="https://employers.glints.vn/recruitment"
									target="_blank"
									rel="noreferrer"
									className={cx("ListItemAnchor")}>
									<span>Recruitment</span>
								</a>
							</li>
							<li className={cx("SectionListItem")}>
								<a
									href="https://employers.glints.vn/managed-talent"
									target="_blank"
									rel="noreferrer"
									className={cx("ListItemAnchor")}>
									<span>Managed Talent</span>
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	);
}

export default Footer;

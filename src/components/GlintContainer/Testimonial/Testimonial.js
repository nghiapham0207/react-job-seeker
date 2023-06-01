import classNames from "classnames/bind";
import { QuoteIcon } from "../../Icon/Icon";

import styles from "./Testimonial.module.scss";

const cx = classNames.bind(styles);

function Testimonial() {
	return (
		<div className={cx("Container")}>
			<div className={cx("FlexCenter")}>
				<h1 className={cx("HeadingContainer")}>
					<span className="heading-text">Người Dùng Glints Nói Gì?</span>
				</h1>
			</div>
			<div>
				<div className="fresnel-container fresnel-lessThan-desktopS " />
				<div className="fresnel-container fresnel-greaterThanOrEqual-desktopS ">
					<div className={cx("SliderContainer")} tabIndex={0} data-testid="slider">
						<div
							className={cx("SliderContentWrapper", "slider-wrapper")}
							style={{
								transform: "translateX(0px)",
								transition: "transform 0.45s ease-out 0s",
							}}>
							<div className={cx("SliderItemWrapper", "slider-item")}>
								<div className={cx("BlockquoteContainer")}>
									<QuoteIcon className={cx("VerticalCenteredSvg")} />
									<div className={cx("BlockquoteProfileWrapper", "blockquote-profile")}>
										<div
											className={cx("ProfilePictureStyle__ProfilePictureContainer")}
											role="presentation"
											aria-label="Profile Picture">
											<div className={cx("ProfilePictureStyle__ProfilePictureContent")}>
												<img
													sizes="119px"
													alt="user"
													src="https://images.glints.com/unsafe/glints-dashboard.s3.amazonaws.com/images/landing/testimonials/jiaann.jpg"
													srcSet="https://images.glints.com/unsafe/119x0/glints-dashboard.s3.amazonaws.com/images/landing/testimonials/jiaann.jpg 119w, 
												https://images.glints.com/unsafe/238x0/glints-dashboard.s3.amazonaws.com/images/landing/testimonials/jiaann.jpg 238w, 
												https://images.glints.com/unsafe/357x0/glints-dashboard.s3.amazonaws.com/images/landing/testimonials/jiaann.jpg 357w, 
												https://images.glints.com/unsafe/476x0/glints-dashboard.s3.amazonaws.com/images/landing/testimonials/jiaann.jpg 476w"
												/>
											</div>
										</div>
									</div>
									<div className={cx("BlockquoteContentWrapper", "blockquote-contentwrapper")}>
										<p
											className={cx(
												"BlockquoteTestimonyWrapper",
												"blockquote-testimony",
												"TestimonialSlidersc__BlockquoteTestimony",
											)}>
											I didn't really know what I wanted to do and what were all the career paths out there - and was
											just exploring the careers on Glints - now I have
											<strong> discovered what I love todo</strong>
											and found my dream career!
										</p>
										<p className={cx("BlockquoteAuthorWrapper", "blockquote-author")}>Jia Ann</p>
										<span className={cx("BlockquoteOriginWrapper", "blockquote-origin")}>
											Nanyang Technological University (NTU)
										</span>
									</div>
								</div>
								<div className={cx("BlockquoteContainer")}>
									<QuoteIcon className={cx("VerticalCenteredSvg")} />
									<div className={cx("BlockquoteProfileWrapper", "blockquote-profile")}>
										<div
											className={cx("ProfilePictureStyle__ProfilePictureContainer")}
											role="presentation"
											aria-label="Profile Picture">
											<div className={cx("ProfilePictureStyle__ProfilePictureContent")}>
												<img
													sizes="119px"
													alt="user"
													src="https://images.glints.com/unsafe/glints-dashboard.s3.amazonaws.com/images/landing/testimonials/zai.png"
													srcSet="https://images.glints.com/unsafe/119x0/glints-dashboard.s3.amazonaws.com/images/landing/testimonials/zai.png 119w, 
												https://images.glints.com/unsafe/238x0/glints-dashboard.s3.amazonaws.com/images/landing/testimonials/zai.png 238w,
												 https://images.glints.com/unsafe/357x0/glints-dashboard.s3.amazonaws.com/images/landing/testimonials/zai.png 357w, 
												 https://images.glints.com/unsafe/476x0/glints-dashboard.s3.amazonaws.com/images/landing/testimonials/zai.png 476w"
												/>
											</div>
										</div>
									</div>
									<div className={cx("BlockquoteContentWrapper", "blockquote-contentwrapper")}>
										<p
											className={cx(
												"BlockquoteTestimonyWrapper",
												"blockquote-testimony",
												"TestimonialSlidersc__BlockquoteTestimony",
											)}>
											The platform is really convenient to reach out to companies &amp; I have managed to secure 2
											interviews already! <strong>I can also track my application status</strong> instead of wondering
											whether the company has seen or shortlisted me.
										</p>
										<p className={cx("BlockquoteAuthorWrapper", "blockquote-author")}>Zai Muhd</p>
										<span className={cx("BlockquoteOriginWrapper", "blockquote-origin")}>
											National University of Singapore (NUS)
										</span>
									</div>
								</div>
							</div>
							<div className={cx("SliderItemWrapper", "slider-item")}>
								<div className={cx("BlockquoteContainer")}>
									<QuoteIcon className={cx("VerticalCenteredSvg")} />
									<div className={cx("BlockquoteProfileWrapper", "blockquote-profile")}>
										<div
											className={cx("ProfilePictureStyle__ProfilePictureContainer")}
											role="presentation"
											aria-label="Profile Picture">
											<div className={cx("ProfilePictureStyle__ProfilePictureContent")}>
												<img
													sizes="119px"
													alt="user"
													src="https://images.glints.com/unsafe/glints-dashboard.s3.amazonaws.com/images/landing/testimonials/chrys.jpg"
													srcSet="https://images.glints.com/unsafe/119x0/glints-dashboard.s3.amazonaws.com/images/landing/testimonials/chrys.jpg 119w, https://images.glints.com/unsafe/238x0/glints-dashboard.s3.amazonaws.com/images/landing/testimonials/chrys.jpg 238w, https://images.glints.com/unsafe/357x0/glints-dashboard.s3.amazonaws.com/images/landing/testimonials/chrys.jpg 357w, https://images.glints.com/unsafe/476x0/glints-dashboard.s3.amazonaws.com/images/landing/testimonials/chrys.jpg 476w"
												/>
											</div>
										</div>
									</div>
									<div className={cx("BlockquoteContentWrapper", "blockquote-contentwrapper")}>
										<p
											className={cx(
												"BlockquoteTestimonyWrapper",
												"blockquote-testimony",
												"TestimonialSlidersc__BlockquoteTestimony",
											)}>
											Glints has been amazing in helping me out with my{" "}
											<strong> skills development through personalised recommendations!</strong> I have found many
											interesting internships and courses to build up my real world experiences.
										</p>
										<p className={cx("BlockquoteAuthorWrapper", "blockquote-author")}>Woon Yong Xin</p>
										<span className={cx("BlockquoteOriginWrapper", "blockquote-origin")}>SIM University</span>
									</div>
								</div>
							</div>
						</div>
						<div disabled data-testid="slider_left-arrow" className={cx("LeftArrowContainer")}>
							<svg
								data-testid="icon-svg"
								className={cx("")}
								width="1em"
								height="1em"
								fill="#c7c7c7"
								viewBox="0 0 100 100">
								<path d="M81 88.4L42.6 50 81 11.8 69.2 0l-50 50 50 50z" />
							</svg>
						</div>
						<div data-testid="slider_right-arrow" className={cx("RightArrowContainer")}>
							<svg
								data-testid="icon-svg"
								className={cx("")}
								width="1em"
								height="1em"
								fill="#000000"
								viewBox="0 0 100 100">
								<path d="M19 88.4L57.4 50 19 11.8 30.8 0l50 50-50 50z" />
							</svg>
						</div>
						<ul className={cx("NavigationContainer")}>
							<li className={cx("NavigationItem", "active")} />
							<li className={cx("NavigationItem")} />
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Testimonial;

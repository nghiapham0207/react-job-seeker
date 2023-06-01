import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import config from "../../../config";
import images from "../../../assets/images";
import styles from "./CareersGrid.module.scss";

const cx = classNames.bind(styles);

function CareersGrid() {
	return (
		<div className={cx("Container")}>
			<div className={cx("FlexCenter")}>
				<h1 className={cx("HeadingContainer")}>
					<span className="heading-text">
						<span>KHÁM PHÁ NGHỀ NGHIỆP MƠ ƯỚC</span>
					</span>
				</h1>
			</div>
			<div className={cx("FlexCenter")}>
				<div className={cx("Label")}>
					<span>Tìm hiểu nghề nghiệp và chuyên môn dành cho bạn</span>
				</div>
			</div>
			{/* Grid */}
			<div>
				<div className={cx("GridContainer")}>
					<a className={cx("GridItem", "Card-7")} href="/vn/category/business-development-sales-jobs/7">
						<div className={cx("InformationContainer")}>
							<div className={cx("InformationGrid")}>
								<p className={cx("TitleWrapper", "InformationTitle")}>
									<span>Business Development/ Nhân viên kinh doanh/ Sales</span>
								</p>
							</div>
							<div className={cx("DividerWrapper")}>
								<div className={cx("DividerContainer")} />
							</div>
							<div className="DetailWrapper">
								<ul className={cx("UnorderedList")}>
									<li>
										<span>7439</span>
										<span>việc làm còn trống</span>
									</li>
									<li>
										<span>1767</span>
										<span>cơ hội việc làm</span>
									</li>
								</ul>
							</div>
						</div>
					</a>
					<a className={cx("GridItem", "Card-10")} href="/vn/category/finance-jobs/10">
						<div className={cx("InformationContainer")}>
							<div className={cx("InformationGrid")}>
								<p className={cx("TitleWrapper", "InformationTitle")}>
									<span>Tài chính/ Finance</span>
								</p>
							</div>
							<div className={cx("DividerWrapper")}>
								<div className={cx("DividerContainer")} />
							</div>
							<div className="DetailWrapper">
								<ul className={cx("UnorderedList")}>
									<li>
										<span>617</span>
										<span>việc làm còn trống</span>
									</li>
									<li>
										<span>358</span>
										<span>cơ hội việc làm</span>
									</li>
								</ul>
							</div>
						</div>
					</a>
					<a className={cx("GridItem", "Card-6")} href="/vn/category/product-management-jobs/6">
						<div className={cx("InformationContainer")}>
							<div className={cx("InformationGrid")}>
								<p className={cx("TitleWrapper", "InformationTitle")}>
									<span>Product Management/ Product Manager/ Giám đốc sản phẩm</span>
								</p>
							</div>
							<div className={cx("DividerWrapper")}>
								<div className={cx("DividerContainer")} />
							</div>
							<div className="DetailWrapper">
								<ul className={cx("UnorderedList")}>
									<li>
										<span>184</span>
										<span>việc làm còn trống</span>
									</li>
									<li>
										<span>112</span>
										<span>cơ hội việc làm</span>
									</li>
								</ul>
							</div>
						</div>
					</a>
					<a className={cx("GridItem", "Card-11")} href="/vn/category/human-resource-jobs/11">
						<div className={cx("InformationContainer")}>
							<div className={cx("InformationGrid")}>
								<p className={cx("TitleWrapper", "InformationTitle")}>
									<span>Nhân sự/ Human Resource/ HR</span>
								</p>
							</div>
							<div className={cx("DividerWrapper")}>
								<div className={cx("DividerContainer")} />
							</div>
							<div className="DetailWrapper">
								<ul className={cx("UnorderedList")}>
									<li>
										<span>1223</span>
										<span>việc làm còn trống</span>
									</li>
									<li>
										<span>525</span>
										<span>cơ hội việc làm</span>
									</li>
								</ul>
							</div>
						</div>
					</a>
					<a className={cx("GridItem", "Card-9")} href="/vn/category/management-jobs/9">
						<div className={cx("InformationContainer")}>
							<div className={cx("InformationGrid")}>
								<p className={cx("TitleWrapper", "InformationTitle")}>
									<span>Quản lý/ Management</span>
								</p>
							</div>
							<div className={cx("DividerWrapper")}>
								<div className={cx("DividerContainer")} />
							</div>
							<div className="DetailWrapper">
								<ul className={cx("UnorderedList")}>
									<li>
										<span>137</span>
										<span>việc làm còn trống</span>
									</li>
									<li>
										<span>79</span>
										<span>cơ hội việc làm</span>
									</li>
								</ul>
							</div>
						</div>
					</a>
					<a className={cx("GridItem", "Card-8")} href="/vn/category/engineering-jobs/8">
						<div className={cx("InformationContainer")}>
							<div className={cx("InformationGrid")}>
								<p className={cx("TitleWrapper", "InformationTitle")}>
									<span>IT/ CNTT/ Lập trình/ Engineering</span>
								</p>
							</div>
							<div className={cx("DividerWrapper")}>
								<div className={cx("DividerContainer")} />
							</div>
							<div className="DetailWrapper">
								<ul className={cx("UnorderedList")}>
									<li>
										<span>267</span>
										<span>việc làm còn trống</span>
									</li>
									<li>
										<span>122</span>
										<span>cơ hội việc làm</span>
									</li>
								</ul>
							</div>
						</div>
					</a>
					<a className={cx("GridItem", "Card-3")} href="/vn/category/design-jobs/3">
						<div className={cx("InformationContainer")}>
							<div className={cx("InformationGrid")}>
								<p className={cx("TitleWrapper", "InformationTitle")}>
									<span>Thiết kế/ Design</span>
								</p>
							</div>
							<div className={cx("DividerWrapper")}>
								<div className={cx("DividerContainer")} />
							</div>
							<div className="DetailWrapper">
								<ul className={cx("UnorderedList")}>
									<li>
										<span>976</span>
										<span>việc làm còn trống</span>
									</li>
									<li>
										<span>536</span>
										<span>cơ hội việc làm</span>
									</li>
								</ul>
							</div>
						</div>
					</a>
					<a className={cx("GridItem", "Card-4")} href="/vn/category/operations-jobs/4">
						<div className={cx("InformationContainer")}>
							<div className={cx("InformationGrid")}>
								<p className={cx("TitleWrapper", "InformationTitle")}>
									<span>Quản lý điều hành/ Operations</span>
								</p>
							</div>
							<div className={cx("DividerWrapper")}>
								<div className={cx("DividerContainer")} />
							</div>
							<div className="DetailWrapper">
								<ul className={cx("UnorderedList")}>
									<li>
										<span>635</span>
										<span>việc làm còn trống</span>
									</li>
									<li>
										<span>251</span>
										<span>cơ hội việc làm</span>
									</li>
								</ul>
							</div>
						</div>
					</a>
					<a className={cx("GridItem", "Card-5")} href="/vn/category/marketing-jobs/5">
						<div className={cx("InformationContainer")}>
							<div className={cx("InformationGrid")}>
								<p className={cx("TitleWrapper", "InformationTitle")}>
									<span>Marketing/ Tiếp thị</span>
								</p>
							</div>
							<div className={cx("DividerWrapper")}>
								<div className={cx("DividerContainer")} />
							</div>
							<div className="DetailWrapper">
								<ul className={cx("UnorderedList")}>
									<li>
										<span>4224</span>
										<span>việc làm còn trống</span>
									</li>
									<li>
										<span>1628</span>
										<span>cơ hội việc làm</span>
									</li>
								</ul>
							</div>
						</div>
					</a>
					<a className={cx("GridItem", "Card-12")} href="/vn/category/media-and-communications-jobs/12">
						<div className={cx("InformationContainer")}>
							<div className={cx("InformationGrid")}>
								<p className={cx("TitleWrapper", "InformationTitle")}>
									<span>Truyền thông/ Media &amp; Communications</span>
								</p>
							</div>
							<div className={cx("DividerWrapper")}>
								<div className={cx("DividerContainer")} />
							</div>
							<div className="DetailWrapper">
								<ul className={cx("UnorderedList")}>
									<li>
										<span>622</span>
										<span>việc làm còn trống</span>
									</li>
									<li>
										<span>247</span>
										<span>cơ hội việc làm</span>
									</li>
								</ul>
							</div>
						</div>
					</a>
				</div>
				<div className="FooterContainer">
					<Link to={config.routes.job} className={cx("FooterItem")}>
						<div>
							<span>Tìm hiểu thêm</span>
						</div>
						<img src={images.arrow} alt="arrow" className={cx("IconHolder")} />
					</Link>
				</div>
			</div>
		</div>
	);
}

export default CareersGrid;

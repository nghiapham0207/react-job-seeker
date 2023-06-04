import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBookmark,
	faBriefcase,
	faClock,
	faDollarSign,
	faLocationDot,
	faStar,
} from "@fortawesome/free-solid-svg-icons";

import { BookmarkOutlineIcon } from "../Icon";
import { dateDiff, dateString } from "../../utils/helpers";
import { createAxiosJwt, patch, path } from "../../utils/axiosAPI";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken, selectRefreshToken, selectSavedJobs, selectUser } from "../../redux/selector";
import { addBookmark, removeBookmark } from "../../redux/savedJobsSlice";
import InfiniteScrollContainer from "../../components/InfiniteScroll";
import { useUserActions } from "../../contexts/userActionsContext";

export default function JobCardWrapper({ job, index, className = "" }) {
	const dispatch = useDispatch();
	const accessToken = useSelector(selectAccessToken);
	const refressToken = useSelector(selectRefreshToken);
	const currentUser = useSelector(selectUser);
	const savedJobs = useSelector(selectSavedJobs);
	console.log(savedJobs);
	const [isLoading, setIsLoading] = useState(false);
	const { handleShowLogin } = useUserActions();
	const handleBookmark = async () => {
		if (currentUser) {
			const axiosInstance = createAxiosJwt(accessToken, refressToken, dispatch);
			try {
				setIsLoading(true);
				const res = await patch(
					path.favouriteJobList,
					{
						jobId: job._id,
					},
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					},
					axiosInstance,
				);
				if (res.isSuccess) {
					if (savedJobs.some((savedJob) => savedJob.jobId._id === job._id)) {
						dispatch(removeBookmark({ _id: job._id }));
					} else {
						dispatch(addBookmark({ job }));
					}
				}
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		} else {
			handleShowLogin();
		}
	};
	return (
		<div className={"JobCard__JobCardWrapper " + className}>
			<Link
				to={`/job/${job._id}`}
				aria-label={"Click to view job detail"}
				className={"CompactOpportunityCard__CardAnchorWrapper"}
				target="_blank"
			/>
			<div className={"CompactOpportunityCard__CompactJobCard"}>
				<div className={"CompactOpportunityCard__CompactJobCardHeader"}>
					<div className={"CompactOpportunityCard__CompanyAvatarWrapper"}>
						<img
							className={"CompactOpportunityCard__CompanyAvatar"}
							alt="Company Avatar"
							src="/static/images/defaultImageCompany.webp"
						/>
					</div>
					<div className={"CompactOpportunityCard__CompactJobCardInfo"}>
						<h3 className={"CompactOpportunityCard__JobTitle"}>{job?.name}</h3>
						<span className={"CompactOpportunityCard__CompanyLinkContainer"}>
							<div className={"CompactOpportunityCard__Ellipsis"}>
								<Link className={"CompactOpportunityCard__CompanyLink"} to={`/company/${job.idCompany?._id}`}>
									{job.idCompany?.name}
								</Link>
							</div>
						</span>
					</div>
					<div>
						{index < 4 ? (
							<div className={"CheckMarkHotJobBadge__CheckMarkHotJobBadgeContainer"}>
								<span>HOT</span>
								<FontAwesomeIcon icon={faStar} className={"IconStyle__VerticalCenteredSvg"} />
							</div>
						) : (
							""
						)}
						<div className={"CompactOpportunityCard__BookmarkIconContainer"}>
							<div className={"BookmarkButton__ButtonWrapper"} onClick={handleBookmark}>
								{isLoading ? (
									<InfiniteScrollContainer size="1.5rem" style={{ margin: "0px" }} />
								) : currentUser ? (
									savedJobs.some((savedJob) => {
										console.log(savedJob);
										return savedJob?.jobId._id === job._id;
									}) ? (
										<FontAwesomeIcon
											className="IconStyle__VerticalCenteredSvg"
											style={{
												color: "rgb(1, 126, 183)",
											}}
											icon={faBookmark}
										/>
									) : (
										<BookmarkOutlineIcon className="IconStyle__VerticalCenteredSvg" />
									)
								) : (
									<BookmarkOutlineIcon className="IconStyle__VerticalCenteredSvg" />
								)}
							</div>
						</div>
					</div>
				</div>
				<div className={"CompactOpportunityCard__OpportunityInfoContainer"}>
					<div className={"CompactOpportunityCard__OpportunityInfo"}>
						<FontAwesomeIcon icon={faLocationDot} />
						<span>{job.locationWorking}</span>
					</div>
					<div className={"CompactOpportunityCard__OpportunityInfo"}>
						<FontAwesomeIcon icon={faDollarSign} />
						<span>{job.salary}</span>
					</div>
					<div className={"CompactOpportunityCard__OpportunityInfo"}>
						<FontAwesomeIcon icon={faBriefcase} />
						<span>Kinh nghiệm công việc</span>
					</div>
				</div>
				<div className={"CompactOpportunityCard__OpportunityMeta"}>
					<div className={"CompactOpportunityCard__CardBottomFlexContainer"}>
						<div className={"CompactOpportunityCard__UpdatedTimeContainer"}>
							<FontAwesomeIcon className={"IconStyle__VerticalCenteredSvg"} icon={faClock} />
							<span className={"CompactOpportunityCard__UpdatedAtMessage"}>{dateString(dateDiff(job.updateDate))}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

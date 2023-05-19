import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faBriefcase, faClock, faDollarSign, faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";

import { BookmarkOutlineIcon } from "../Icon";
import { dateDiff, dateString } from "../../utils/helpers";

export default function JobCardWrapper({ job, index }) {
  return (
    <div className={("JobCard__JobCardWrapper")}>
      <Link to={`/job/${job._id}`}
        aria-label={"Click to view job detail"}
        className={("CompactOpportunityCard__CardAnchorWrapper")}
        target="_blank" />
      <div className={("CompactOpportunityCard__CompactJobCard")}>
        <div className={("CompactOpportunityCard__CompactJobCardHeader")}>
          <div className={("CompactOpportunityCard__CompanyAvatarWrapper")}>
            <img className={("CompactOpportunityCard__CompanyAvatar")}
              alt="Company Avatar"
              src="/static/images/defaultImageCompany.webp" />
          </div>
          <div className={("CompactOpportunityCard__CompactJobCardInfo")}>
            <h3 className={("CompactOpportunityCard__JobTitle")}>
              {job?.name}
            </h3>
            <span className={("CompactOpportunityCard__CompanyLinkContainer")}>
              <div className={("CompactOpportunityCard__Ellipsis")}>
                <Link className={("CompactOpportunityCard__CompanyLink")}
                  to={`/company/${job.idCompany?._id}`} >
                  {job.idCompany?.name}
                </Link>
              </div>
            </span>
          </div>
          <div>
            {(index < 4) ?
              <div className={("CheckMarkHotJobBadge__CheckMarkHotJobBadgeContainer")}>
                <span>HOT</span>
                <FontAwesomeIcon icon={faStar}
                  className={("IconStyle__VerticalCenteredSvg")} />
              </div> : ""}
            <div className={("CompactOpportunityCard__BookmarkIconContainer")}>
              <div className={("BookmarkButton__ButtonWrapper")}>
                {
                  true ?
                    <FontAwesomeIcon className="IconStyle__VerticalCenteredSvg" style={{
                      color: "rgb(1, 126, 183)"
                    }} icon={faBookmark} /> :
                    <BookmarkOutlineIcon className="IconStyle__VerticalCenteredSvg" />
                }
              </div>
            </div>
          </div>
        </div>
        <div className={("CompactOpportunityCard__OpportunityInfoContainer")}>
          <div className={("CompactOpportunityCard__OpportunityInfo")}>
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{job.locationWorking}</span>
          </div>
          <div className={("CompactOpportunityCard__OpportunityInfo")}>
            <FontAwesomeIcon icon={faDollarSign} />
            <span>{job.salary}</span>
          </div>
          <div className={("CompactOpportunityCard__OpportunityInfo")}>
            <FontAwesomeIcon icon={faBriefcase} />
            <span>Kinh nghiệm công việc</span>
          </div>
        </div>
        <div className={("CompactOpportunityCard__OpportunityMeta")}>
          <div className={("CompactOpportunityCard__CardBottomFlexContainer")}>
            <div className={("CompactOpportunityCard__UpdatedTimeContainer")}>
              <FontAwesomeIcon className={("IconStyle__VerticalCenteredSvg")} icon={faClock} />
              <span className={("CompactOpportunityCard__UpdatedAtMessage")}>
                {dateString(dateDiff(job.updateDate))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
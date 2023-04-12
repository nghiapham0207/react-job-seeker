import { useParams } from "react-router-dom";
import { useEffect, useState, createContext } from "react";

import { createAxiosJwt, get } from "../../utils/axiosAPI";
import GlintContainer from "../../components/GlintContainer";
import OpportunitySticky from "../../components/OpportunitySticky";
import Opportunity from "../../components/Opportunity";
import BreadCrump from "../../components/BreadCrump/BreadCrump";
import { useDocumentTitle } from "../../hooks";
import PsychFlatModal from "../../components/PsychFlatModal";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken, selectRefreshToken, selectUser } from "../../redux/selector";
import instance from "../../utils/axiosAPI";

export const JobContext = createContext();

function DetailJob() {
  // console.log("Render DetailJob");
  useDocumentTitle("Chi Tiết Công Việc");
  const [showPsychFlat, setShowPsychFlat] = useState(false);
  const handleShowPsychFlat = () => {
    // check user then login then redirect
    setShowPsychFlat(!showPsychFlat);
  }
  const currentUser = useSelector(selectUser);
  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);
  const dispatch = useDispatch();
  const { _id } = useParams(); // id must match id in url
  const [job, setJob] = useState({});
  useEffect(() => {
    const fetchApi = async () => {
      const axiosInstance = currentUser ?
        createAxiosJwt(accessToken, refreshToken, dispatch) : instance;
      try {
        const res = await get(`job/detail?id=${_id}`, {
          headers: {
            Authorization: currentUser ? `Bearer ${accessToken}` : null
          }
        }, axiosInstance);
        console.log(res);
        setJob(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchApi();
  }, []);
  // check if job not found caused by change url
  return <>
    <JobContext.Provider value={job}>
      {/* breadcrumpm has not completed yet */}
      <BreadCrump />
      <GlintContainer>
        <Opportunity openModal={handleShowPsychFlat} />
      </GlintContainer>
      <OpportunitySticky openModal={handleShowPsychFlat} />
      {/* modal here */}
      {showPsychFlat && <PsychFlatModal handleShowPsychFlat={handleShowPsychFlat} />}
    </JobContext.Provider>
  </>
}

export default DetailJob;

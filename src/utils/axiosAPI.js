import axios from "axios";
import jwtDecode from "jwt-decode";

import { loginSuccess } from "../redux/authSlice";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

const getNewAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error("refreshToken is not found in refreshToken function");
  }
  try {
    console.log("refreshToken", refreshToken);
    console.log("refreshToken", path.refreshToken);
    const res = await instance.post(path.refreshToken, {}, {
      headers: {
        Authorization: `bearer ${refreshToken}`
      }
    })
    console.log("getNewAccessToken", res);
    return res.data;
  } catch (error) {
    console.log("refreshToken", error);
  }
}

export const createAxiosJwt = (accessToken, refreshToken, dispatch, navigate) => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  })
  instance.interceptors.request.use(
    async (config) => {
      const date = new Date();
      // check refresh token exp first, then check accesToken
      const decodedRefresh = jwtDecode(refreshToken);
      if (decodedRefresh.exp < date.getTime() / 1000) {
        // set token null then show login, and then redirect path before
      }
      const decodedToken = jwtDecode(accessToken);
      // console.log("date", date.getTime());
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await getNewAccessToken(refreshToken);
        console.log("data", data);
        if (data.isSuccess) {
          dispatch(loginSuccess(data));
          config.headers["Authorization"] = `Bearer ${data.accessToken}`
        }
      }
      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  )
  return instance;
}

export const get = async (path, config = {}, axiosInstance = instance) => {
  const response = await axiosInstance.get(path, config);
  return response.data;
}

export const post = async (path, data = {}, config = {}, axiosInstance = instance) => {
  const response = await axiosInstance.post(path, data, config);
  return response.data;
}

export const put = async (path, data = {}, config = {}, axiosInstance = instance) => {
  const response = await axiosInstance.put(path, data, config);
  return response.data;
};

export const patch = async (path, data = {}, config = {}, axiosInstance = instance) => {
  const response = await axiosInstance.patch(path, data, config);
  return response.data;
}

export const path = {
  login: "auth/login",
  logout: "auth/logout",
  changePassword: "auth/change-password",
  companies: "company/list",
  company: "company/detail",
  editProfile: "auth/edit-profile",
  register: "auth/register",
  getUser: "auth/info-user",
  jobList: "job/list/sort-by-date",
  jobListByCompany: "job/list/company",
  jobListFilter: "job/list/filter",
  favouriteJobList: "job/list-job-favourite",
  searchJob: "job/list/search",
  searchSuggestion: "job/search-by-key",
  applyJob: "application/create",
  forgotPassword: "auth/forgot-password",
  resetPassword: "auth/confirm-password",
  refreshToken: "auth/refresh-token",
  occupations: "occupation/list"
}

export default instance;

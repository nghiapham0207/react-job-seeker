import jwtDecode from "jwt-decode";
import { loginSuccess, logoutSuccess } from "../redux/authSlice";
import { createAxiosJwt, post } from "../utils/axiosAPI";
import { path } from "../utils/axiosAPI";
import { updateUser } from "../redux/userSlice";
import { clearBookmark, setBookmark } from "../redux/savedJobsSlice";

export const login = async ({ username, password }, dispatch, navigate, next) => {
	try {
		const res = await post(path.login, { username, password });
		if (res.success) {
			dispatch(loginSuccess(res.data));
			const resUser = await getUser(res.data.accessToken, res.data.refreshToken, dispatch);
			console.log(resUser);
			if (resUser.isSuccess) {
				dispatch(
					updateUser({
						_id: resUser.data._id,
						name: resUser.data.name,
						avatar: resUser.data.avatar,
						phone: resUser.data.phone,
						email: resUser.data.email,
						username: resUser.data.username,
						// savedJobs: resUser.data.jobFavourite
					}),
				);
				dispatch(
					setBookmark({
						savedJobs: resUser.data.jobFavourite,
					}),
				);
			}
		}
	} catch (error) {
		console.log(error);
		return error.response.data.message;
	}
};

export const logout = async (accessToken, refreshToken, dispatch) => {
	const axiosJwt = createAxiosJwt(accessToken, refreshToken, dispatch);
	try {
		const res = await axiosJwt.patch(
			path.logout,
			{},
			{
				headers: {
					Authorization: `bearer ${accessToken}`,
				},
			},
		);
		if (res.data.isSuccess) {
			dispatch(logoutSuccess());
			dispatch(updateUser(null));
			dispatch(clearBookmark());
		}
	} catch (error) {
		console.log(error);
	}
};

export const getUser = async (accessToken, refreshToken, dispatch) => {
	const date = new Date();
	const decodedRefresh = jwtDecode(refreshToken);
	if (refreshToken) {
		if (!(decodedRefresh.exp < date.getTime() / 1000)) {
			const axiosJwt = createAxiosJwt(accessToken, refreshToken, dispatch);
			try {
				const res = await axiosJwt.get(path.getUser, {
					headers: {
						Authorization: `bearer ${accessToken}`,
					},
				});
				return {
					isSuccess: true,
					data: res.data,
				};
			} catch (error) {
				return {
					data: error.response.data,
				};
			}
		}
	}
};

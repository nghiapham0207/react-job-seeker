import { toast } from "react-toastify";
import { createAxiosJwt, path, post } from "../utils/axiosAPI";
import config from "../config";

export const applyJob = async (formData, accessToken, refreshToken, dispatch, navigate) => {
	const axiosJwt = createAxiosJwt(accessToken, refreshToken, dispatch);
	try {
		const res = await post(
			path.applyJob,
			formData,
			{
				headers: {
					Authorization: `bearer ${accessToken}`,
					"Content-Type": "multipart/form-data",
				},
			},
			axiosJwt,
		);
		toast.success(res.message);
		navigate(config.routes.job);
	} catch (error) {
		console.log(error);
		toast.error("Lỗi Từ Server!");
	}
};

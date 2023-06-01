import { Outlet, Route } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import Error from "../components/Error/Error";

export const convertSizeFile = (size) => {
	/**
	 * default, size of file will limit at 5MB
	 * this function will convert B to MB
	 */
	const kb = Math.floor(size / 1024);
	const mb = kb / 1024;
	if (mb < 1) {
		return `${kb}KB`;
	} else {
		return `${mb}MB`;
	}
};

export const getImageUrl = (user) => {
	if (!user.avatar) {
		throw new Error("Not Found user.avatar: " + user.avatar);
	}
	return `${process.env.REACT_APP_BASE_URL}images/${user.avatar}`;
};

export const dateToString = (stringDate) => {
	const date = new Date(stringDate);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	return `${day}/${month}/${year}`;
};

export const dateDiff = (dateString) => {
	const date = new Date(dateString);
	const dateNow = Date.now();
	const diff = Math.abs(dateNow - date.getTime());
	return diff;
};

export const dateString = (dateDiff, message = "Cập nhật ") => {
	const second = Math.round(dateDiff / 1000);
	const minute = Math.round(second / 60);
	const hour = Math.round(minute / 60);
	const day = Math.round(hour / 24);
	const month = Math.round(day / 30);
	const year = Math.round(month / 12);
	let result = message;
	if (year !== 0) {
		result += year + " năm trước";
	} else if (month !== 0) {
		result += month + " tháng trước";
	} else if (day !== 0) {
		if (day === 1) {
			result += "Hôm qua";
		} else {
			result += day + " ngày trước";
		}
	} else if (hour !== 0) {
		result += hour + " giờ trước";
	} else {
		result = "Vừa mới " + message.toLowerCase();
	}
	return result;
};

export const renderRoutes = (routes) => {
	let reactElements = null;
	if (Array.isArray(routes)) {
		reactElements = routes.map((route, index) => {
			const Layout = route.layout ?? DefaultLayout; // null or undefined
			const Page = route?.component;
			const children = route.children;
			if (children?.length) {
				return (
					<Route key={index} path={route.path} element={<Outlet />}>
						<Route index element={<Layout></Layout>} />
						{children.map((childRoute) => {
							const ChildPage = childRoute.component;
							return (
								<Route
									key={childRoute.key}
									path={childRoute.path}
									element={
										<Layout>
											<ChildPage />
										</Layout>
									}
								/>
							);
						})}
					</Route>
				);
			} else {
				return (
					<Route
						key={index}
						path={route.path}
						element={
							<Layout>
								<Page />
							</Layout>
						}
					/>
				);
			}
		});
		return reactElements;
	} else {
		throw new Error("Routes must be an array!");
	}
};

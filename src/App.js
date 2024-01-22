import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { privateRoutes, publicRoutes } from "./routes/routes";
import { selectUser } from "./redux/selector";
import { useEffect } from "react";
import { get, path } from "./utils/axiosAPI";
import { renderRoutes } from "./utils/helpers";

const ProtectedRoute = ({ redirectPath = "/login" }) => {
	const currentUser = useSelector(selectUser);
	const currentPathName = window.location.pathname;
	if (!currentUser) {
		return <Navigate to={`${redirectPath}?next=${encodeURIComponent(currentPathName)}`} replace />;
	}
	return <Outlet />;
};

function App() {
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await get(path.companies);
				console.log(res.message);
			} catch (error) {
				console.log(error);
			} finally {
			}
		};
		fetchData();
	}, []);
	return (
		<BrowserRouter>
			<div className="App">
				<ToastContainer />
				<Routes>
					{renderRoutes(publicRoutes)}
					{<Route element={<ProtectedRoute />}>{renderRoutes(privateRoutes)}</Route>}
				</Routes>
			</div>
		</BrowserRouter>
	);
}

ProtectedRoute.propTypes = {
	user: PropTypes.object,
};

export default App;

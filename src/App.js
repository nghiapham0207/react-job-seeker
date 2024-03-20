import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { selectUser } from "./redux/selector";
import { useEffect } from "react";
import { get, path } from "./utils/axiosAPI";
import ErrorBoundary from "./components/ErrorBoundary";
import getRoutes from "./routes/routes";

export const ProtectedRoute = ({ redirectPath = "/login" }) => {
	const currentUser = useSelector(selectUser);
	const currentPathName = window.location.pathname;
	if (!currentUser) {
		return <Navigate to={`${redirectPath}?next=${encodeURIComponent(currentPathName)}`} replace />;
	}
	return <Outlet />;
};

function App() {
	const routes = getRoutes();
	console.log(routes);

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
			<ErrorBoundary
				fallback={
					<div>
						<p>Something went wrong</p>
						<a href="/">Go to home page</a>
					</div>
				}>
				<div className="App">
					<ToastContainer />
					<Routes>{routes}</Routes>
				</div>
			</ErrorBoundary>
		</BrowserRouter>
	);
}

ProtectedRoute.propTypes = {
	user: PropTypes.object,
};

export default App;

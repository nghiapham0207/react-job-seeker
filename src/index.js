import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store, persistor } from "./redux/store";
import { PastJobSearchProvider } from "./contexts/pastJobSearchContext";
import { SearchInputProvider } from "./contexts/searchInputContext";
import { FilterOptionsProvider } from "./contexts/filterOptionsContext";
import { UserActionsProvider } from "./contexts/userActionsContext";
// either remove .module or use !important
import "./App.css"; // to prioritize classes passed into component
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={<p>Loading...</p>} persistor={persistor}>
				<UserActionsProvider>
					<PastJobSearchProvider>
						<SearchInputProvider>
							<FilterOptionsProvider>
								<QueryClientProvider client={queryClient}>
									<App />
									<ReactQueryDevtools initialIsOpen={false} />
								</QueryClientProvider>
							</FilterOptionsProvider>
						</SearchInputProvider>
					</PastJobSearchProvider>
				</UserActionsProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

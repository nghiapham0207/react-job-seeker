import { createContext, useContext, useState } from "react";

const UserActionsContext = createContext();
export function UserActionsProvider({ children }) {
	const [showLogin, setShowLogin] = useState(false);
	const handleShowLogin = () => {
		const currentPathName = window.location.pathname;
		if (!currentPathName.includes("login")) {
			setShowLogin(!showLogin);
		}
	};
	return <UserActionsContext.Provider value={{ showLogin, handleShowLogin }}>{children}</UserActionsContext.Provider>;
}

export function useUserActions() {
	const context = useContext(UserActionsContext);
	if (context) {
		return context;
	} else {
		throw new Error("Context is not found!");
	}
}

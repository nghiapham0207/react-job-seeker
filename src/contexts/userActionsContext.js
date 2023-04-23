import { createContext, useContext, useState } from "react";

const UserActionsContext = createContext();
export function UserActionsProvider({ children }) {
  const [showLogin, setShowLogin] = useState(false);
  const handleShowLogin = (isRequired = false) => {
    // if (isRequired) {
    //   setShowLogin(true);
    // } else {
    //   setShowLogin(!showLogin);
    // }
      setShowLogin(!showLogin);
  }
  return (
    <UserActionsContext.Provider value={{ showLogin, handleShowLogin }}>
      {children}
    </UserActionsContext.Provider>
  )
}

export function useUserActions() {
  const context = useContext(UserActionsContext);
  if (context) {
    return context;
  } else {
    throw new Error("Context is not found!");
  }
}
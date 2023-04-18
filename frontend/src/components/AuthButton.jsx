import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { logout, loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  if (isAuthenticated) {
    return (
      <button
        className="d-flex flex-start align-items-center btn btn-light rounded-pill mb-2 fs-5"
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log Out
      </button>
    );
  } else if (!isAuthenticated && !isLoading) {
    return (
      <button
        className="d-flex flex-start align-items-center btn btn-light rounded-pill mb-2 fs-5"
        onClick={() => loginWithRedirect()}
      >
        Log In
      </button>
    );
  } else {
    return;
  }
};

export default LoginButton;

import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { logout, loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

    if (isAuthenticated) {
        return (
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Log Out
            </button>
        )
    } else if (!isAuthenticated && !isLoading) {
        return (
            <button onClick={() => loginWithRedirect()}>
                Log In
            </button>
        )
    } else {
        return
    }
};

export default LoginButton;

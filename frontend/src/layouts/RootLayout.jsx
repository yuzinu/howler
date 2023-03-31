import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { NavLink, Outlet} from "react-router-dom";
import AuthButton from "../components/AuthButton";

export default function RootLayout() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>Howler</h1>
          <NavLink to="/">Home</NavLink>
          <br />
          { isAuthenticated && 
            <NavLink to={`/${user.nickname}`}>Profile</NavLink>
          }
          <br />
          <AuthButton />
        </nav>
      </header>

      <main>
        <Outlet context={{ user, isAuthenticated, isLoading }}/>
      </main>
    </div>
  );
};

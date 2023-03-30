import React from "react";
import { NavLink, Outlet} from "react-router-dom";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>Meepo</h1>
          <NavLink to="/">Home</NavLink>
          <LoginButton />
          <LogoutButton />
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};
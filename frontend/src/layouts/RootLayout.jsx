import React from "react";
import { NavLink, Outlet} from "react-router-dom";
import AuthButton from "../components/AuthButton";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>Howler</h1>
          <NavLink to="/">Home</NavLink>
          <AuthButton />
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};
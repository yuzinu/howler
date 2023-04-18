import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarNav from "../components/Navbars/SidebarNav";
import WhatsHappening from "../components/WhatsHappening";
import Logo from "../components/Navbars/Logo";
import FooterNav from "../components/Navbars/FooterNav";

export default function RootLayout() {
  const { logout, user, isAuthenticated, isLoading } = useAuth0();
  const [modalHowlSubmit, setModalHowlSubmit] = useState(false);

  if (isAuthenticated) {
    return (
      <>
        <div className="container d-none d-lg-block">
          <div className="d-flex row h-100 ">
            <header className="col-3 d-flex flex-column align-items-end vh-100">
              <SidebarNav
                logout={logout}
                user={user}
                isAuthenticated={isAuthenticated}
                modalHowlSubmit={modalHowlSubmit}
                setModalHowlSubmit={setModalHowlSubmit}
              />
            </header>
            <main className="col-6 vh-100 px-0 feed">
              <Outlet
                context={{
                  user,
                  isAuthenticated,
                  isLoading,
                  modalHowlSubmit,
                  setModalHowlSubmit,
                }}
              />
            </main>
            <div className="col-3 p-4">
              <WhatsHappening />
            </div>
          </div>
        </div>
        <div className="container d-lg-none">
          <div className="row h-100 w-100 m-0 p-0">
            <header className="px-0">
              <Logo />
            </header>
            <main className="col-12 vh-100 w-100 px-0 feed">
              <Outlet
                context={{
                  user,
                  isAuthenticated,
                  isLoading,
                  modalHowlSubmit,
                  setModalHowlSubmit,
                }}
              />
            </main>
            <footer>
              <FooterNav
                logout={logout}
                user={user}
                isAuthenticated={isAuthenticated}
              />
            </footer>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="container d-none d-lg-block">
          <div className="d-flex row h-100">
            <header className="col-3 d-flex flex-column align-items-end vh-100">
              <SidebarNav isAuthenticated={isAuthenticated} />
            </header>
            <main className="col-6 vh-100 px-0 feed">
              <Outlet context={{ isAuthenticated }} />
            </main>
            <div className="col-3 p-4">
              <WhatsHappening />
            </div>
          </div>
        </div>
        <div className="container d-lg-none h-100 w-100">
          <div className="row h-100 w-100 m-0 p-0">
            <header className="px-0">
              <Logo />
            </header>
            <main className="col-12 vh-100 w-100 px-0 feed">
              <Outlet context={{ isAuthenticated }} />
            </main>
            <footer>
              <FooterNav isAuthenticated={isAuthenticated} />
            </footer>
          </div>
        </div>
      </>
    );
  }
}

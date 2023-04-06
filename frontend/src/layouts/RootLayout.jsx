import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AuthButton from "../components/AuthButton";
import SidebarNav from "../components/SidebarNav/SidebarNav";
import WhatsHappening from "../components/WhatsHappening";
import Feed from "../components/Feed";

export default function RootLayout() {
  const { logout, user, isAuthenticated, isLoading } = useAuth0();
  const [modalHowlSubmit, setModalHowlSubmit] = useState(false);

  if (isAuthenticated) {
    return (
        <div className="container">
          <div className="row h-100">
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
              <Outlet context={{ user, isAuthenticated, isLoading, modalHowlSubmit, setModalHowlSubmit }}/>
            </main>
            <div className="col-3 p-4">
              <WhatsHappening />
            </div>
          </div>
        </div>
    );
  } else {
    return (
      <>
        <div className="container">
          <div className="row h-100">
            <header className="col-3 d-flex flex-column align-items-end vh-100">
              <SidebarNav
                isAuthenticated={isAuthenticated}
              />
            </header>
            <main className="col-6 vh-100 px-0 feed">
              <Outlet context={{ isAuthenticated }}/>
            </main>
            <div className="col-3 p-4">
              <WhatsHappening />
            </div>
          </div>
        </div>
      </>
    )
  }
};

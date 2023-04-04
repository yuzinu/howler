import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { Outlet} from "react-router-dom";
import AuthButton from "../components/AuthButton";
import SidebarNav from "../components/SidebarNav/SidebarNav";

export default function RootLayout() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [modalHowlSubmit, setModalHowlSubmit] = useState(false);

  if (user) {
    return (
        <div className="container">
          <div className="row h-100">
            <header className="d-flex flex-column col-3 align-items-end" style={{maxHeight:"100vh"}}>
              <SidebarNav 
                user={user} 
                isAuthenticated={isAuthenticated} 
                modalHowlSubmit={modalHowlSubmit} 
                setModalHowlSubmit={setModalHowlSubmit}
                />
              <AuthButton />
            </header>
            <main className="col-9">
              <Outlet context={{ user, isAuthenticated, isLoading, modalHowlSubmit, setModalHowlSubmit }}/>
            </main>
          </div>
        </div>
    );
  } else {
    return (
      <>
        <AuthButton />
      </>
    )
  }
};

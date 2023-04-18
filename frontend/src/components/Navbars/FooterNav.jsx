import React from "react";
import { useNavigate } from "react-router-dom";
import { RiHome7Line } from "react-icons/ri";
import { BsPerson } from "react-icons/bs";
import AuthButton from "../AuthButton";

function FooterNav({ isAuthenticated, user }) {
  const navigate = useNavigate();

  if (isAuthenticated) {
    return (
      <>
        <div className="z-3 d-flex justify-content-evenly align-items-center fixed-bottom bg-light-subtle footer-nav">
          <button
            className="d-flex flex-start align-items-center btn btn-light rounded-pill mb-2 fs-5"
            onClick={() => navigate("/")}
          >
            <RiHome7Line />
          </button>
          <button
            className="d-flex flex-start align-items-center btn btn-light rounded-pill mb-2 fs-5"
            onClick={() => navigate(`/${user.nickname}`)}
          >
            <BsPerson />
          </button>
          <AuthButton />
        </div>
      </>
    );
  } else {
    return (
      <div className="z-3 d-flex justify-content-evenly align-items-center fixed-bottom bg-light-subtle footer-nav">
        <AuthButton />
      </div>
    );
  }
}

export default FooterNav;

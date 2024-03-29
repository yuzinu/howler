import React from "react";
import { useOutletContext } from "react-router-dom";
import Feed from "../components/Feed";

function Home() {
  const {
    isAuthenticated,
    user,
    isLoading,
    modalHowlSubmit,
    setModalHowlSubmit,
  } = useOutletContext();

  if (isAuthenticated) {
    if (isLoading) {
      return <div>Loading ...</div>;
    }

    return (
      <div className="container px-0">
        <div className="w-100">
          <Feed
            user={user}
            isAuthenticated={isAuthenticated}
            modalHowlSubmit={modalHowlSubmit}
            setModalHowlSubmit={setModalHowlSubmit}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="container px-0">
        <div className="w-100">
          <Feed isAuthenticated={isAuthenticated} />
        </div>
      </div>
    );
  }
}

export default Home;

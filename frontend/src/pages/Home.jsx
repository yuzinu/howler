import React, { useEffect } from "react";
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

  useEffect(() => {
    if (isAuthenticated) {
      const body = {
        username: user.nickname,
        auth0_token: user.sub,
      };

      fetch("https://howler-backend.onrender.com/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          window.alert(data.message);
        })
        .catch((err) => console.log(err));
    }
  }, []);

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

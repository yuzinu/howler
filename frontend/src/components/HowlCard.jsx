import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistance } from "date-fns";

export default function HowlCard({ howl, userHowl }) {
  const navigate = useNavigate();
  const [howlOwner, setHowlOwner] = useState({
    username: "",
  });

  if (howl) {
    const timePassed = formatDistance(new Date(), new Date(howl.updated_at), {
      addSuffix: false,
    });

    useEffect(() => {
      const body = {
        howler_id: howl.howler_id,
      };
      fetch("https://howler-backend.onrender.com/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          setHowlOwner({
            username: data.username,
          });
        })
        .catch((err) => console.log(err));
    }, []);

    return (
      <div role="button" onClick={() => navigate(`/howl/${howl.id}`)}>
        <div className="card">
          <div className="row g-0">
            <div className="col">
              <div className="card-body">
                <span className="card-title fw-bold m-0">
                  {howlOwner.username}
                </span>
                <span className="ps-2">
                  <small className="text-muted">
                    Last updated {timePassed} ago
                  </small>
                </span>
                <p className="card-text">{howl.caption}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (userHowl) {
    const timePassed = formatDistance(
      new Date(),
      new Date(userHowl.updated_at),
      { addSuffix: false }
    );

    useEffect(() => {
      const body = {
        howler_id: userHowl.howler_id,
      };
      fetch("https://howler-backend.onrender.com/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          setHowlOwner({
            username: data.username,
          });
        })
        .catch((err) => console.log(err));
    }, []);

    return (
      <div role="button" onClick={() => navigate(`/howl/${userHowl.id}`)}>
        <div className="card">
          <div className="row g-0">
            <div className="col">
              <div className="card-body">
                <span className="card-title fw-bold m-0">
                  {howlOwner.username}
                </span>
                <span className="ps-2">
                  <small className="text-muted">
                    Last updated {timePassed} ago
                  </small>
                </span>
                <p className="card-text">{userHowl.caption}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

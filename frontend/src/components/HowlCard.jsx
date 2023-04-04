import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistance } from 'date-fns';

export default function HowlCard({ howl }) {
    const navigate = useNavigate();
    const [howlOwner, setHowlOwner] = useState({
        username: ""
    });

    const timePassed = formatDistance(new Date(), new Date(howl.updated_at), { addSuffix: false });

    useEffect (() => {
        const body = {
            howler_id: howl.howler_id
        };
        fetch("http://localhost:5000/api/user",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }
        )
        .then(res => res.json())
        .then(data => {
            setHowlOwner({
                username: data.username
            });
        })
        .catch(err => console.log(err));
    }, [howlOwner, setHowlOwner]);

    return (
        <div onClick={() => navigate(`/howl/${howl.id}`)} >
            <div className="card">
                <div className="row g-0">
                    {/* <div className="col-md-4">
                        <img
                            src="https://via.placeholder.com/150"
                            className="img-fluid rounded-start"
                            alt="Placeholder"
                        />
                    </div> */}
                    {/* <div className="col-md-8"> */}
                    <div className="col">
                        <div className="card-body">
                            <span className="card-title fw-bold m-0">{howlOwner.username}</span>
                            {/* <span className="ps-2">
                                <small className="text-muted">@handle</small>
                            </span> */}
                            <span className="ps-2">
                                <small className="text-muted">Last updated {timePassed} ago</small>
                            </span>
                            <p className="card-text">
                                {howl.caption}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from "react-router-dom";

function UserFeed({ user, isAuthenticated }) {
    const navigate = useNavigate();
    const { username } = useParams();

    const [userHowls, setUserHowls] = useState([]);
    const [caption, setCaption] = useState("");

    useEffect (() => {
        fetch(`http://localhost:5000/api/${username}`)
        .then(res => res.json())
        .then(data => {
            setUserHowls(data);
        })
        .catch(err => console.log(err));
    }, [caption, setCaption]);

    const addHowl = async (e) => {
        e.preventDefault();
        try {
            const body = {
            auth0_token: user.sub,
            caption: caption
            };
            const res = await fetch('http://localhost:5000/api/howl/createHowl',
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );
            console.log(res);
            setCaption("");
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div>
            <h2 style={{ textAlign: 'start' }}>{username}'s Feed</h2>
            <div>
                <ul>
                    {userHowls.map(userHowl => {
                        return (
                            <li key={userHowl.id} {...userHowl}>
                                <div onClick={() => navigate(`/howl/${userHowl.id}`)} >
                                    {userHowl.caption}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
            { isAuthenticated && (
                <div className="mt-5">
                    <h2>Add a howl</h2>
                    <form onSubmit={addHowl}>
                        <div>
                            <label htmlFor="caption" >Caption</label>
                            <br />
                            <textarea
                                id="caption"
                                name="caption"
                                onChange={(e) => {
                                    setCaption(e.target.value);
                                }}
                                value={caption}
                            >
                            </textarea>
                        </div>
                        <button type="submit" className="btn btn-primary" value="Upload">Submit</button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default UserFeed;

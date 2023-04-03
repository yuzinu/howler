import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";

function Feed({ user, isAuthenticated }) {
    const navigate = useNavigate();
    
    const [howls, setHowls] = useState([]);
    const [caption, setCaption] = useState("");

    useEffect (() => {
        fetch("http://localhost:5000/api/feed")
        .then(res => res.json())
        .then(data => {
            setHowls(data);
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
        <div className='mt-4'>
            <h2 style={{ textAlign: 'start' }}>Home</h2>
            { isAuthenticated && (
                <div className="mt-5">
                    <h2>Add a howl</h2>
                    <form onSubmit={addHowl}>
                        <div>
                            <br />
                            <textarea
                                id='caption'
                                name='caption'
                                className='w-100'
                                placeholder='What’s Happening?'
                                onChange={(e) => {
                                    setCaption(e.target.value);
                                }}
                                value={caption}
                            >
                            </textarea>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn rounded-pill text-white" style={{backgroundColor:"#50b7f5"}}>
                                Howl
                            </button>
                        </div>
                    </form>
                </div>
            )}
            <div>
                <ul>
                    {howls.map(howl => {
                        return (
                            <li key={howl.id} {...howl}>
                                <div onClick={() => navigate(`/howl/${howl.id}`)} >
                                    {howl.caption}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Feed;

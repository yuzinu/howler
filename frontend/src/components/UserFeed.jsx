import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import AddHowl from './AddHowl';

function UserFeed({ user, isAuthenticated, modalHowlSubmit, setModalHowlSubmit }) {
    const navigate = useNavigate();
    const { username } = useParams();

    const [userHowls, setUserHowls] = useState([]);
    const [caption, setCaption] = useState("");

    useEffect (() => {
        fetch(`http://localhost:5000/api/${username}`)
        .then(res => res.json())
        .then(data => {
            setUserHowls(data);
            setModalHowlSubmit(false);
        })
        .catch(err => console.log(err));
    }, [caption, setCaption, modalHowlSubmit, setModalHowlSubmit]);

    return (
        <div className='mt-4'>
            <h2 className='fs-6 fw-bold'>{user.name}</h2>
            <small className="text-muted p-0 m-0">{userHowls.length > 0 ? userHowls.length : "0"} Howls</small>
            <AddHowl
                user={user} 
                isAuthenticated={isAuthenticated} 
                caption={caption} 
                setCaption={setCaption}
            />
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
        </div>
    )
}

export default UserFeed;

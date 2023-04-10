import React, {useEffect, useState} from 'react';
import { useParams, useOutletContext } from "react-router-dom";
import AddHowl from './AddHowl';
import HowlCard from './HowlCard';

function UserFeed() {
    const { user, modalHowlSubmit, setModalHowlSubmit } = useOutletContext();
    const { username } = useParams();

    const [userHowls, setUserHowls] = useState([]);
    const [caption, setCaption] = useState("");

    useEffect (() => {
        fetch(`https://howler-backend.onrender.com/api/${username}`)
        .then(res => res.json())
        .then(data => {
            setUserHowls(data);
            setModalHowlSubmit(false);
        })
        .catch(err => console.log(err));
    }, [caption, setCaption, modalHowlSubmit, setModalHowlSubmit]);

    if (user) {
        return (
            <>
                <div className="sticky-top bg-white border-bottom">
                    <h2 className='fs-6 fw-bold px-2 pt-2 m-0'>{user.name}</h2>
                    <small className="text-muted px-2 pb-2 m-0">{userHowls.length > 0 ? userHowls.length : "0"} Howls</small>
                    <AddHowl
                        caption={caption} 
                        setCaption={setCaption}
                    />
                </div>
                <div>
                    <ul className='p-0'>
                        {userHowls.map(userHowl => {
                            return (
                                <li style={{listStyle:"none"}} key={userHowl.id}>
                                    < HowlCard userHowl={userHowl}/>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </>
        )
    } else {
        return
    }
}

export default UserFeed;

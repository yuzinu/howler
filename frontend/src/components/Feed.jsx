import React, {useEffect, useState} from 'react';
import AddHowl from './AddHowl';
import HowlCard from './HowlCard';

function Feed({ user, isAuthenticated, modalHowlSubmit, setModalHowlSubmit }) {
    
    const [howls, setHowls] = useState([]);
    const [caption, setCaption] = useState("");

    useEffect (() => {
        fetch("http://localhost:5000/api/feed")
        .then(res => res.json())
        .then(data => {
            setHowls(data);
            setModalHowlSubmit(false);
        })
        .catch(err => console.log(err));
    }, [caption, setCaption, modalHowlSubmit, setModalHowlSubmit]);

    return (
        <div className='mt-4'>
            <span className='fs-6 fw-bold'>Home</span>
            <AddHowl 
                user={user} 
                isAuthenticated={isAuthenticated} 
                caption={caption} 
                setCaption={setCaption}
            />
            <div>
                <ul className='p-0'>
                    {howls.map(howl => {
                        return (
                            <li className="" style={{listStyle:"none"}} key={howl.id}>
                                < HowlCard howl={howl}/>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Feed;

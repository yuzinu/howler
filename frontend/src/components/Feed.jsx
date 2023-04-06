import React, {useEffect, useState} from 'react';
import AddHowl from './AddHowl';
import HowlCard from './HowlCard';

function Feed({ user, isAuthenticated, modalHowlSubmit, setModalHowlSubmit }) {
    
    const [howls, setHowls] = useState([]);
    const [caption, setCaption] = useState("");

    if(isAuthenticated){
        useEffect (() => {
            fetch("http://localhost:5000/api/feed")
            .then(res => res.json())
            .then(data => {
                setHowls(data);
                setModalHowlSubmit(false);
            })
            .catch(err => console.log(err));
        }, [caption, setCaption, modalHowlSubmit, setModalHowlSubmit]);
    } else {
        useEffect (() => {
            fetch("http://localhost:5000/api/feed")
            .then(res => res.json())
            .then(data => {
                setHowls(data);
            })
            .catch(err => console.log(err));
        }, [caption, setCaption, modalHowlSubmit, setModalHowlSubmit]);
    }

    return (
        <>
            { isAuthenticated && (
                <div className="sticky-top bg-white border-bottom">
                    <p className='fs-6 fw-bold p-2'>Home</p>
                    <AddHowl
                        user={user} 
                        isAuthenticated={isAuthenticated} 
                        caption={caption} 
                        setCaption={setCaption}
                    />
                </div>
            )}
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
        </>
    )
}

export default Feed;

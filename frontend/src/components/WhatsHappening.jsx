import React, {useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom";

function WhatsHappening() {
    const navigate = useNavigate();

    const [randomHowls, setRandomHowls] = useState([]);

    useEffect (() => {
        fetch("http://localhost:5000/api/random")
        .then(res => res.json())
        .then(data => {
            setRandomHowls(data);
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <>
            <div className="rounded-4 bg-body-tertiary p-2">
                <p className="p-2 fw-bold">
                    What’s Happening
                </p>
                <ul className='p-2'>
                    {randomHowls.map(randomHowl => {
                        return (
                            <li className="" style={{listStyle:"none"}} key={randomHowl.id}>
                                <div role="button" onClick={() => navigate(`/howl/${randomHowl.id}`)} >
                                    <div className="row g-0">
                                        <div className="col">
                                            <p className="card-text">
                                                {randomHowl.caption}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    )
}

export default WhatsHappening;
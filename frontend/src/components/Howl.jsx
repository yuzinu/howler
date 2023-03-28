import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Howl() {
    const id = useParams().howlId;
    // const id = parseInt(useLocation().pathname.split("/")[2]);
    const [howl, setHowl] = useState({
        id: "",
        caption: "",
        created_at: "",
        updated_at: ""
    });

    const fetchHowl = () => {
        fetch('http://localhost:5000/api/howl/' + `${id}`, {
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => res.json())
        .then((data) => {
            setHowl(data);
        })
        .catch(err => err);
    }
    
    useEffect(() => {
        fetchHowl();
    }, [setHowl, id]);

    return (
        <div>
            <p>
                Howl: {howl.caption}
            </p>
            <p>
                {new Date(howl.updated_at).toLocaleDateString('en-US') + " at " + new Date(howl.updated_at).toLocaleTimeString('en-US')}
            </p>
        </div>
    )
};

export default Howl;
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

function Howl() {
    const id = useParams().howlId;
    // const id = parseInt(useLocation().pathname.split("/")[2]);
    const [howl, sethowl] = useState({
        id: "",
        caption: "",
        created_at: "",
        updated_at: ""
    });
    
    useEffect(() => {
        fetch('http://localhost:5000/api/howl/' + `${id}`, {
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => res.json())
        .then((data) => {
            sethowl(data);
        })
        .catch(err => err);
    }, [sethowl, id]);

    return (
        <div>Howl: {howl.caption}</div>
    )
};

export default Howl;
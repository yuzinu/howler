import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Howl() {
    const { howlId } = useParams();
    // const id = parseInt(useLocation().pathname.split("/")[2]);
    const [howl, setHowl] = useState({
        id: "",
        caption: "",
        created_at: "",
        updated_at: ""
    });
    
    const fetchData = () => {
        return fetch(`http://localhost:5000/api/howl/${howlId}`)
            .then((response) => response.json())
            .then((data) => console.log(data));}

    useEffect(() => {
      fetchData();
      }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/api/howl/${howlId}`, {
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => res.json())
        .then((data) => {
            setHowl(data);
        })
        .catch(err => err);
    }, [howl]);

    return (
        <div>
          Howl: {howl.caption}
        </div>
    )
};

export default Howl;
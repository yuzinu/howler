import React, {useEffect, useState} from 'react';
import HowlList from "./HowlList";

function Feed() {
    const [howls, setHowls] = useState([]);

    useEffect (() => {
        fetch("http://localhost:5000/api/feed")
            .then(res => res.json())
            .then(data => {
                setHowls(data);
            })
            .catch(err => err);
    }, []);

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Feed</h2>
            <HowlList howls={howls} />
        </div>
    )
}

export default Feed;
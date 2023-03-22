import React, {useEffect, useState} from 'react';

function App() {
    const [message, setMessage] = useState("");

    useEffect (() => {
        fetch("http://localhost:5000/")
            .then(res => res.text())
            .then(res => setMessage(res))
            .catch(err => err);
    }, []);

    return (
        <>
            <h1>
                Welcome to Howler
            </h1>
            <p>
                {message}
            </p>
        </>
    )
};

export default App;
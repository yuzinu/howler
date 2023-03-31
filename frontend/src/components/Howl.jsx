import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { format } from 'date-fns';

function Howl() {
    const { user, isAuthenticated } = useOutletContext();
    const navigate = useNavigate();
    const { howlId } = useParams();
    // const id = parseInt(useLocation().pathname.split("/")[2]);
    const [howl, setHowl] = useState({
        id: "",
        caption: "",
        howler: "",
        updated_at: ""
    });

    const [updatedHowl, setUpdatedHowl] = useState({
        id: "",
        caption: "",
        howler: "",
        updated_at: ""
    });

    useEffect(() => {
        fetch(`http://localhost:5000/api/howl/${howlId}`, {
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setHowl({
              id: data.id,
              caption: data.caption,
              howler: data.howler,
              howler_id: data.howler_id,
              updated_at: format(new Date(data.updated_at), 'MMM dd, yyyy h:mm a')
            });
        })
        .catch(err => err);
    }, []);

    useEffect(() => {
      if (user) {
        console.log(user)
        console.log(howl)
        console.log(user.nickname==howl.howler)
      }
    })

    const changeHowl = async (e) => {
        // e.preventDefault();
        try {
            const body = { caption: updatedHowl.caption };
            const res = await fetch(`http://localhost:5000/api/howl/changeHowl/${howlId}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );
            // const data = await res.json();
        } catch (err) {
            console.error(err.message);
        }
    };

    const deleteHowl = async () => {
        try {
            await fetch(`http://localhost:5000/api/howl/silenceHowl/${howlId}`, {
                method: "DELETE"
            });
            navigate('/');
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div>
            <div>
                <p>{howl.caption}</p>
                <p>{howl.howler}</p>
                <p>{howl.updated_at}</p>
            </div>
            { user && user.nickname==howl.howler && (
                <>
                    <form
                        onSubmit={changeHowl}
                        encType="multipart/form-data"
                    >
                        <input
                            type='text'
                            name='caption'
                            placeholder='Change howl here'
                            onChange={(e) => {
                                console.log(e.target.value);
                                setUpdatedHowl({...updatedHowl, caption: e.target.value});
                            }}
                            value={updatedHowl.caption}
                        />
                        <button type='submit'>Change Howl</button>
                    </form>
                    <button type='button' onClick={deleteHowl}>
                        Delete Howl
                    </button>
                </>
            )}
            <span>
                {new Date(howl.updated_at).toLocaleDateString('en-US') + " at " + new Date(howl.updated_at).toLocaleTimeString('en-US')}
            </span>
        </div>
    )
};

export default Howl;

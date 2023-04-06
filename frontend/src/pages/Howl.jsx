import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { format } from 'date-fns';

function Howl() {
    const { user, isAuthenticated } = useOutletContext();
    const navigate = useNavigate();
    const { howlId } = useParams();

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
            setHowl({
              id: data.id,
              caption: data.caption,
              howler: data.howler,
              howler_id: data.howler_id,
              updated_at: format(new Date(data.updated_at), 'MMM dd, yyyy h:mm a')
            });
        })
        .catch(err => err);
    }, [howlId, updatedHowl, setUpdatedHowl]);

    const changeHowl = async (e) => {
        e.preventDefault();
        try {
            const body = { caption: updatedHowl.caption };
            const res = await fetch(`http://localhost:5000/api/howl/changeHowl/${howlId}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );
            const data = await res.json();
            setUpdatedHowl({
                id: "",
                caption: "",
                howler: "",
                updated_at: ""
            });
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

    if(isAuthenticated){
        return (
            <div className='container'>
                <div className='ps-4 mt-4'>
                    <p>{howl.caption}</p>
                    <p>{howl.howler}</p>
                    <p>{howl.updated_at}</p>
                    { user && user.nickname==howl.howler && (
                        <div>
                            <form
                                onSubmit={changeHowl}
                                encType="multipart/form-data"
                            >
                                <input
                                    type='text'
                                    name='caption'
                                    placeholder='Change howl here'
                                    onChange={(e) => {
                                        setUpdatedHowl({...updatedHowl, caption: e.target.value});
                                    }}
                                    value={updatedHowl.caption}
                                />
                                <button disabled={!updatedHowl.caption} className='btn btn-primary rounded-pill' type='submit'>Change Howl</button>
                            </form>
                            <button type='button' className='btn btn-danger rounded-pill' onClick={deleteHowl}>
                                Delete Howl
                            </button>
                        </div>
                    )}
                </div>
            </div>
        )
    } else {
        return (
            <div className='container'>
                <div className='ps-4 mt-4'>
                    {console.log(howl)}
                    <p>{howl.caption}</p>
                    <p>{howl.howler}</p>
                    <p>{howl.updated_at}</p>
                </div>
            </div>
        )
    }
};

export default Howl;

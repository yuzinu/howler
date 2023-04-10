import React from "react";
import { useOutletContext } from "react-router-dom";

function AddHowl({ caption, setCaption }) {
    const { user, isAuthenticated } = useOutletContext();

    const addHowl = async (e) => {
        e.preventDefault();
        try {
            const body = {
            auth0_token: user.sub,
            caption: caption
            };
            if(caption === '') {
                setError(true);
            } else {
                const res = await fetch('https://howler-backend.onrender.com/api/howl/createHowl',
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
                    }
                );
                console.log(res);
                setCaption("");
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <>
            { isAuthenticated && (
                <div className="mt-5">
                    <form onSubmit={addHowl}>
                        <div>
                            <textarea
                                id="caption"
                                name="caption"
                                className='border-top border-bottom w-100 p-3'
                                placeholder='What’s Happening?'
                                onChange={(e) => {
                                    setCaption(e.target.value);
                                }}
                                value={caption}
                            >
                            </textarea>
                        </div>
                        <div className="d-flex justify-content-end p-3">
                            <button disabled={!caption} type="submit" className="btn btn-primary rounded-pill text-white" >
                                Howl
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}

export default AddHowl;
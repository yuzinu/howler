import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { RiHome7Line } from "react-icons/ri";
import { BsPerson } from "react-icons/bs";
import AuthButton from "../AuthButton";

function SidebarNav( { logout, isAuthenticated, user, setModalHowlSubmit } ) {
    const navigate = useNavigate();

    const [caption, setCaption] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

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
                handleCloseModal();
                setModalHowlSubmit(true);
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    if (isAuthenticated) {
        return (
            <>
                <div className="d-flex flex-column flex-grow-1" style={{width: "259px"}}>
                    <Logo />
                    <div className="d-flex flex-column justify-content-between flex-grow-1">
                        <div className="d-flex flex-column flex-grow-1 ">
                            <button className="d-flex flex-start align-items-center btn btn-light rounded-pill mb-2 fs-5" onClick={() => navigate('/')}>
                                <RiHome7Line />
                                <span className="ps-2">Home</span>
                            </button>
                            <button className="d-flex flex-start align-items-center btn btn-light rounded-pill mb-2 fs-5" onClick={() => navigate(`/${user.nickname}`)}>
                                <BsPerson />
                                <span className="ps-2">Profile</span>
                            </button>
                            <AuthButton />
                            <button className="btn btn-primary rounded-pill p-2 fs-5 fw-bold" onClick={handleShowModal}>Howl</button>
                            {showModal && (
                                <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-div">
                                                <div className="modal-title p-2">
                                                    <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" onClick={handleCloseModal}>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="modal-body">
                                                <textarea
                                                    id="caption"
                                                    name="caption"
                                                    className='card w-100 my-3 p-3'
                                                    placeholder='What’s Happening?'
                                                    onChange={(e) => {
                                                        setCaption(e.target.value);
                                                    }}
                                                    value={caption}>
                                                </textarea>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleCloseModal}>Close</button>
                                                <button 
                                                    disabled={!caption} 
                                                    type="button" 
                                                    className="btn btn-primary rounded-pill text-white" 
                                                    style={{backgroundColor:"#1da1f2"}} 
                                                    onClick={(e) => {
                                                        addHowl(e);
                                                    }}>
                                                    Howl
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div role="button" className="btn btn-light rounded-pill container d-flex justify-content-start align-items-center p-2" style={{height: "65px"}} onClick={() => navigate('/')}>
                            <img src={user.picture} alt='profilepic' className="rounded-circle h-75 m-0" />
                            <div className="d-flex flex-column justify-content-center m-0 ps-2">
                                <p className="fw-bold m-0">
                                    {user.name}
                                </p>
                                <p className="m-0">
                                    @{user.nickname}
                                </p>
                            </div>
                        </div>
                        {/* <div class="dropdown">
                            <button type="button" className="btn btn-light dropdown-toggle mb-3 rounded-pill container d-flex justify-content-start align-items-center p-2" data-bs-toggle="dropdown" aria-expanded="false" style={{height: "65px"}}>
                                <img src={user.picture} alt='profilepic' className="rounded-circle h-75 m-0" />
                                <div className="d-flex flex-column justify-content-center m-0 ps-2">
                                    <p className="fw-bold m-0">
                                        {user.name}
                                    </p>
                                    <p className="m-0">
                                        @{user.nickname}
                                    </p>
                                </div>
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <button className="dropdown-item" type="button" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                                        Log out @{user.nickname}
                                    </button>
                                </li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="d-flex flex-column flex-grow-1" style={{width: "259px"}}>
                    <Logo />
                    <div className="d-flex flex-column justify-content-between flex-grow-1">
                        <AuthButton />
                    </div>
                </div>
            </>
        )
    }
}

export default SidebarNav;
import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Logo from "./Logo";
import { RiHome7Line } from "react-icons/ri";
import { FiHash } from "react-icons/fi";
import { VscBell } from "react-icons/vsc";
import { FiMail } from "react-icons/fi";
import { BiBookmark } from "react-icons/bi";
import { TbLetterB } from "react-icons/tb";
import { BsPerson } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { GrMore } from "react-icons/gr";

function SidebarNav() {
    const navigate = useNavigate();
    const { user, isAuthenticated, isLoading } = useOutletContext();

    return (
        <>
            <header className="container mt-4">
                <Logo />
                <div className="d-flex flex-column mb-3">
                    <button className="mb-2" onClick={() => navigate('/')}>
                        <RiHome7Line />
                        <span>Home</span>
                    </button>
                    <button className="mb-2" onClick={() => navigate('/')}>
                        <FiHash />
                        <span>Explore</span>
                    </button>
                    <button className="mb-2" onClick={() => navigate('/')}>
                        <VscBell />
                        <span>Notifications</span>
                    </button>
                    <button className="mb-2" onClick={() => navigate('/')}>
                        <FiMail />
                        <span>Messages</span>
                    </button>
                    <button className="mb-2" onClick={() => navigate('/')}>
                        <BiBookmark />
                        <span>Bookmarks</span>
                    </button>
                    <button className="mb-2" onClick={() => navigate('/')}>
                        <TbLetterB />
                        <span>Twitter Blue</span>
                    </button>
                    <button className="mb-2" onClick={() => navigate(`/${user.nickname}`)}>
                        <BsPerson />
                        <span>Profile</span>
                    </button>
                    <button className="mb-2" onClick={() => navigate('/')}>
                        <CgMoreO />
                        <span>More</span>
                    </button>
                    <button className="mb-2" onClick={() => navigate('/')}>
                        <span>Tweet</span>
                    </button>
                    <button className="mb-2" onClick={() => navigate('/')}>
                        <img src={user.picture} alt='profilepic' />
                        <span className="profilebar-font">
                            {user.name}
                            <span className='morestyle'><GrMore /></span>
                            <br />
                        </span>
                        <span className="profilename-font">@{user.nickname}</span>
                    </button>
                </div>
            </header>
        </>
    )
}

export default SidebarNav;
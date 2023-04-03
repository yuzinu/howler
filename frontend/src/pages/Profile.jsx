import { useOutletContext } from 'react-router-dom';
import React from "react";
import UserFeed from '../components/UserFeed';
import SidebarNav from '../components/SidebarNav/SidebarNav';

function Profile() {
    const { user, isAuthenticated, isLoading } = useOutletContext();

    if (isLoading) {
      return <div>Loading ...</div>;
    };

    console.log(user);

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-sm-3'>
                    <SidebarNav user={user} isAuthenticated={isAuthenticated} />
                </div>
                <div className='col-sm-9 d-flex justify-content-evenly'>
                    <div className="w-50">
                        <UserFeed user={user} isAuthenticated={isAuthenticated} />
                    </div>
                    <div className="w-25">
                        {/* Add Search Bar What's happening and Who to follow here*/}
                        <p>What's Happening</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;

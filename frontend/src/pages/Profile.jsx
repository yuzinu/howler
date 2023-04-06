import { useOutletContext } from 'react-router-dom';
import React from "react";
import UserFeed from '../components/UserFeed';

function Profile() {
    const { user, isAuthenticated, isLoading, modalHowlSubmit, setModalHowlSubmit } = useOutletContext();

    if (isLoading) {
      return <div>Loading ...</div>;
    };

    // console.log(user);

    return (
        <div className='container px-0'>
            <div className='w-100'>
                <UserFeed 
                    user={user} 
                    isAuthenticated={isAuthenticated} 
                    modalHowlSubmit={modalHowlSubmit} 
                    setModalHowlSubmit={setModalHowlSubmit}
                />
            </div>
        </div>
    )
}

export default Profile;

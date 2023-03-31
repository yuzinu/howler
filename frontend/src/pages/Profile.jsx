import { useOutletContext } from 'react-router-dom';
import React from "react";
import UserFeed from '../components/UserFeed';

function Profile() {
    const { user, isAuthenticated, isLoading } = useOutletContext();

    if (isLoading) {
      return <div>Loading ...</div>;
    };

    console.log(user);

    return (
        <>
            { isAuthenticated && (
                    <div>
                        <img src={user.picture} alt={user.name} referrerPolicy="no-referrer" />
                        <h2>
                            Welcome, {user.name}
                        </h2>
                        <span>
                            {user.sub}
                        </span>
                    </div>
                )
            }
            <UserFeed user={user} isAuthenticated={isAuthenticated} />
        </>
    )
}

export default Profile;

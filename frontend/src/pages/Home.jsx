import { useOutletContext } from 'react-router-dom';
import React from "react";
import Feed from "../components/Feed";

function Home() {
    const { user, isAuthenticated, isLoading, modalHowlSubmit, setModalHowlSubmit } = useOutletContext();

    if (isLoading) {
      return <div>Loading ...</div>;
    };

    // console.log(user);

    return (
        <div className='container'>
            <div className='d-flex justify-content-evenly'>
                <div className="w-50">
                    <Feed 
                        user={user} 
                        isAuthenticated={isAuthenticated} 
                        modalHowlSubmit={modalHowlSubmit} 
                        setModalHowlSubmit={setModalHowlSubmit}
                    />
                </div>
                <div className="w-25 mt-4">
                    {/* Add Search Bar What's happening and Who to follow here*/}
                    <p>What's Happening</p>
                </div>
            </div>
        </div>
    )
}

export default Home;

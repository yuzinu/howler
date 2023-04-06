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
        <div className='container px-0'>
            <div className='w-100'>
                <Feed 
                    user={user} 
                    isAuthenticated={isAuthenticated} 
                    modalHowlSubmit={modalHowlSubmit} 
                    setModalHowlSubmit={setModalHowlSubmit}
                />
            </div>
        </div>
    )
}

export default Home;

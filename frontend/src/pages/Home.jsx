import { useOutletContext } from 'react-router-dom';
import React from "react";
import Feed from "../components/Feed";

function Home() {
    const { isAuthenticated } = useOutletContext();
    
    if (isAuthenticated) {
        const { user, isLoading, modalHowlSubmit, setModalHowlSubmit } = useOutletContext();
    
        if (isLoading) {
          return <div>Loading ...</div>;
        };

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
    } else {
    
        return (
            <div className='container px-0'>
                <div className='w-100'>
                    <Feed 
                        isAuthenticated={isAuthenticated} 
                    />
                </div>
            </div>
        )
    }
}

export default Home;

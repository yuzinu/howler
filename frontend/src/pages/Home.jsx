import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Feed from "../components/Feed";

function Home() {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
      return <div>Loading ...</div>;
    };

    console.log(user)

    return (
        <>
            { isAuthenticated && (
                    <div>
                        <img src={user.picture} alt={user.name} />
                        <h2>
                            Welcome, {user.name}
                        </h2>
                        <span>
                            {user.sub}
                        </span>
                    </div>
                )
            }
            <Feed user={user} isAuthenticated={isAuthenticated} />
        </>
    )
}

export default Home;

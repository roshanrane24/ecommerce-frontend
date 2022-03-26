import React, {createContext, useState} from "react";

export const UserContext = createContext(undefined);

const UserProvider = (props) => {
    // user state
    const [userDetails, setUserDetails] = useState(null);

    return (
        <UserContext.Provider value={[userDetails, setUserDetails]}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;
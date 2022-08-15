import React, { useState, createContext } from "react";

export const ProfileContext = createContext();

export const ProfileContextProvider = (props) => {

    const [prof, setProf] = useState(['empty'])

    return (
        <ProfileContext.Provider value={{ prof, setProf }}>
            {props.children}
        </ProfileContext.Provider>
    );
};

    

import React, { useState, createContext } from "react";

export const LoginContext = createContext();

export const LoginContextProvider = (props) => {

    const [auth, setAuth] = useState([])

    return (
        <LoginContext.Provider value={{ auth, setAuth }}>
            {props.children}
        </LoginContext.Provider>
    );
};

    

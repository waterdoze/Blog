import React, {useState, createContext} from "react";


export const LoginContext = createContext();

export const LoginContextProvider = (props) => {

    const [users, setUsers] = useState([])

    return (
        <LoginContext.Provider value={{ users, setUsers }}>
            {props.children}
        </LoginContext.Provider>
    );
};



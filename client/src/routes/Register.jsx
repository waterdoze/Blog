import React, { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import Reddle from "../apis/Reddle";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/


const Register = (props) => {

    // const {users, setUsers} = useContext(LoginContext);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await Reddle.get("/");
    //             setUsers(response.data.data.users);
    //             console.log(response);
    //         }
    //         catch (err) {
    //             console.log(err);
    //         }
    //     }

    //     fetchData();
    // }, [])
    const userReference = useRef();
    const errorReference = useRef();

    const [name, setName] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userReference.current.focus();
    },[]);

    useEffect(() => {
        const result = USER_REGEX.test(name);
        console.log(result);
        console.log(name);
        setValidName(result);
    }, [name]);

    useEffect(() => {
        const result = PASSWORD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidPassword(result);
        const match = password == matchPassword;
        setValidMatch(match);
    }, [password, matchPassword]);

    useEffect(() => {
        setErrorMessage("");
    }, [name, password, matchPassword]);

    let navigate = useNavigate();

    const handleSubmit = () => {
        navigate(`/1/`);
        // e.preventDefault();
        // const today = new Date();

        // try {
        //     const response = await Reddle.post("/", {
        //         name: name,
        //         cake_day: "" + (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear(),
        //         karma: 0,
        //         country: "",
        //         password: password
        //     });

        //     console.log(response);
        // }
        // catch (err) {

        // }
    }

    const handleLogin = async () => {
        await navigate("/login");
    }

    return (
        <section>

            <div>
                <div className='display-1 text-center'>Reddle</div>
            </div>

            <form className="shadow w-25 m-auto mt-5 p-3 border">
                <p ref={errorReference} className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive">
                    {errorMessage}
                </p>
                <div className="form-group mb-3">
                    <label htmlFor="inputUsername">Username</label>
                    <input 
                        value={name} 
                        ref={userReference}
                        autoComplete="off"
                        onChange={(e) => setName(e.target.value)} 
                        aria-invalid={validName ? "false": "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                        type="username" 
                        className="form-control" 
                        id="inputUsername" 
                        placeholder="Enter Username"
                    />
                    <p id="uidnote" className={userFocus && name && !validName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faCoffee} />
                        4 to 24 characters.<br/>
                        Must begin with a letter.<br/>
                        Letters, numbers, underscores, hyphen allowed.
                    </p>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input 
                        value={password}
                        autoComplete="off"
                        onChange={(e) => setPassword(e.target.value)} 
                        type="password" 
                        className="form-control" 
                        id="inputPassword" 
                        placeholder="Password"
                    />
                </div>

                <button onClick={() => handleLogin()}type="register" className="btn btn-link mb-3">Login Here</button>

                <div className="text-center">
                    
                    <button onClick={() => handleSubmit()} type="submit" className="btn btn-primary">Register</button>
                </div>
                

            </form>
        </section>

    )
}

export default Register;
import React, { useEffect, useRef, useState } from "react";

import { faInfoCircle, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Reddle from "../apis/Reddle";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[`~!@#$%^&*()-=_+<>?,./{}|";']).{8,24}$/

const REGISTER_URL = "/register";

const Register = (props) => {

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

    useEffect(() => {
        userReference.current.focus();
    },[]);

    useEffect(() => {
        const result = USER_REGEX.test(name);
        setValidName(result);
    }, [name]);

    useEffect(() => {
        const result = PASSWORD_REGEX.test(password);

        setValidPassword(result);
        const match = password == matchPassword;

        setValidMatch(match);
    }, [password, matchPassword]);

    useEffect(() => {
        setErrorMessage("");
    }, [name, password, matchPassword]);

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const today = new Date();

        const v1 = USER_REGEX.test(name);
        const v2 = PASSWORD_REGEX.test(password);

        if (!v1 || !v2) {
            setErrorMessage("Invalid Entry");
            return;
        }

        try {
            const response = await Reddle.post(REGISTER_URL, {
                name: name,
                cake_day: "" + (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear(),
                karma: 0,
                country: "",
                password: password
            });

            console.log(response);
        }
        catch (err) {

        }

        navigate("../main");
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        await navigate("../login");
    }

    const backgroundColor = {
        backgroundColor: "rgba(255, 86, 0, 1)",
        height: "100vh"
    }

    const bigText = {
        fontSize: "160px",
    }

    return (
        <section style={backgroundColor}>

            <div>
                <div className='display-1 text-center text-white text' style={bigText}>Reddle</div>
            </div>

            <form className="shadow-lg w-25 m-auto mt-5 p-3 bg-light card">
                <p ref={errorReference} className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive">
                    {errorMessage}
                </p>
                <div className="form-group mb-3">
                    <label htmlFor="inputUsername">
                        Username:&nbsp;
                        <span className={validName ? "valid" : "d-none"}>
                            <FontAwesomeIcon icon={faCheck}/>
                        </span>
                        <span className={validName || !name ? "d-none" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </span>
                    </label>
                    <input 
                        value={name} 
                        ref={userReference}
                        autoComplete="off"
                        onChange={(e) => setName(e.target.value)} 
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                        type="username" 
                        className="form-control" 
                        id="inputUsername" 
                        placeholder="Enter Username"
                    />
                    <p id="uidnote" className={userFocus && name && !validName ? "instructions small card text-white bg-danger mt-3 p-2" : "d-none"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters.<br/>
                        Must begin with a letter.
                    </p>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="inputPassword">
                        Password:&nbsp;
                        <span className={validPassword ? "valid" : "d-none"}>
                            <FontAwesomeIcon icon={faCheck}/>
                        </span>
                        <span className={validPassword || !password ? "d-none" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </span>
                    </label>
                    <input 
                        value={password}
                        autoComplete="off"
                        onChange={(e) => setPassword(e.target.value)} 
                        aria-invalid={validPassword ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                        type="password" 
                        className="form-control" 
                        id="inputPassword" 
                        placeholder="Password"
                    />
                    <p id="pwdnote" className={passwordFocus && password && !validPassword ? "instructions small card text-white bg-danger mt-3 p-2" : "d-none"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.<br/>
                        Must include uppercase and lowercase letters, a number and a special character.<br/>
                    </p>
                </div>
                <div className="form-group">
                    <label htmlFor="inputMatchPassword">
                        Match Password:&nbsp;
                        <span className={validMatch  && password.length > 0 ? "valid" : "d-none"}>
                            <FontAwesomeIcon icon={faCheck}/>
                        </span>
                        <span className={validMatch || !matchPassword ? "d-none" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </span>
                    </label>
                    <input 
                        value={matchPassword}
                        autoComplete="off"
                        onChange={(e) => setMatchPassword(e.target.value)} 
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="matchnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                        type="password" 
                        className="form-control" 
                        id="inputMatchPassword" 
                        placeholder="Password"
                    />
                    <p id="matchnote" className={matchFocus && matchPassword && !validMatch ? "instructions small card text-white bg-danger mt-3 p-2" : "d-none"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the declared password.<br/>
                    </p>
                </div>
                
                <div className="text-left">
                    <button onClick={(e) => handleLogin(e)}type="register" className="btn btn-link mb-3 ">Login Here</button>
                </div>

                <div className="text-center">
                    <button onClick={(e) => handleSubmit(e)} type="submit" className="btn btn-primary btn-lg" disabled={!validName || !validPassword || !validMatch ? true : false}>
                        Register
                    </button>
                </div>
                

            </form>
        </section>

    )
}

export default Register;
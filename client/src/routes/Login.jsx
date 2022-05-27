import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Reddle from "../apis/Reddle";
import { LoginContext } from "../context/LoginContext";

const LOGIN_URL = "";

const Login = (props) => {

    let navigate = useNavigate();

    const { setAuth } = useContext(LoginContext); 
    const userReference = useRef();
    const errorReference = useRef();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userReference.current.focus();
    }, []);

    useEffect(() => {
        setErrorMessage("");
    }, [name, password]);

    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                LOGIN_URL, 
                JSON.stringify({name, password}),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );

            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            
            setAuth({ name, password, roles, accessToken });
            setName("");
            setPassword("");
        }
        catch (err) {
            if (!err?.response) {
                setErrorMessage("No Server Response");
            }
            else if (err.response?.status == 400) {
                setErrorMessage("Missing Username or Password");
            }
            else if (err.response?.status == 401) {
                setErrorMessage("Unauthorized");
            }
            else {
                setErrorMessage("Login Failed");
            }
        }
    }

    const HandleLogin = () => {
        setSuccess(false);
    }

    const HandleRegister = () => {
        navigate("/");
    }
    return (

        <section className="">
            <div>
                <div className='display-1 text-center'>Reddle</div>
            </div>

            <form className="shadow w-25 m-auto mt-5 p-3 border">
                <div className="form-group mb-3">
                    <label htmlFor="inputUsername">Username</label>
                    <input 
                        value={name} 
                        ref={userReference} 
                        onChange={(e) => setName(e.target.value)} 
                            
                        type="username" 
                        className="form-control" 
                        id="inputEmail" 
                        placeholder="Enter Username"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        
                        type="password" 
                        className="form-control" 
                        id="inputPassword" 
                        placeholder="Password"
                    />
                </div>

                <button onClick={() => HandleRegister()} type="register" className="btn btn-link mb-3">Need an Account?</button>

                <div className="text-center">
                    
                    <button onClick={(e) => HandleSubmit(e)} type="submit" className="btn btn-primary">Login</button>
                </div>
                

            </form>
        </section>
    )
}

export default Login;
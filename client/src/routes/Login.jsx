import Reddle from "../apis/Reddle";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const LOGIN_URL = "/login";

const Login = (props) => {

    let navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
        
    const { setAuth } = useAuth();
    const userReference = useRef();

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
            const response = await Reddle.post(
                LOGIN_URL, {
                    name: name, 
                    password: password
                }
            );

            // const accessToken = response?.data?.accessToken;
            // const roles = response?.data?.roles;
            
            // setAuth({ name, password, roles, accessToken });
            // setName("");
            // setPassword("");

            // navigate(from, { replace: true });
            console.log(response);
            // navigate('../main');
        }
        catch (err) {
            
        }
    }

    const HandleLogin = () => {
        setSuccess(false);
    }

    const HandleRegister = () => {
        navigate("/register");
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
                <div className="form-group mb-3">
                    <label htmlFor="inputUsername">Username:</label>
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
                    <label htmlFor="inputPassword">Password:</label>
                    <input 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        
                        type="password" 
                        className="form-control" 
                        id="inputPassword" 
                        placeholder="Password"
                    />
                </div>

                <div className="text-left">
                    <button onClick={() => HandleRegister()} type="register" className="btn btn-link mb-3">Need an Account?</button>
                </div>
                <div className="text-center">
                    
                    <button onClick={(e) => HandleSubmit(e)} type="submit" className="btn btn-primary btn-lg">Login</button>
                </div>
                

            </form>
        </section>
    )
}

export default Login;
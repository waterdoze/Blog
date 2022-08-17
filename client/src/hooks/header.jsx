import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

    const handleLogin = () => {
        loginWithRedirect();
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="d-flex flex-row-reverse mb-2">

            {!isAuthenticated ? (
                <button
                    className="btn btn-primary"
                    onClick={() => handleLogin()}
                >
                    Login
                </button>
            ) : (
                <button
                    className="btn btn-primary"
                    onClick={() => handleLogout()}
                >
                    Logout
                </button>
            )}

            <Link to='/profile' style={{padding: '5px'}}>
                Profile
            </Link>
            <Link to='/mainforum' style={{padding: '5px'}}>
                Forum
            </Link>
        </div>
    );
};

export default Header;

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
        <div className="text-right">
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
        </div>
    );
};

export default Header;

import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const SignUp = (props) => {

    const { loginWithRedirect } = useAuth0()
    return (
        <div className="text-center">
            <div>
                <h1>You're not Logged In Yet! Signup and Create an Account</h1>
                <button
                    className="btn btn-primary"
                    onClick={loginWithRedirect}
                >
                    Signup
                </button>
            </div>
        </div>
    );
};

export default SignUp;

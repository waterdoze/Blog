import React from "react";

const Login = () => {
    return (
        <div>
            <div>
                <div class='display-1 text-center'>Reddle</div>
            </div>

            <form class="shadow w-25 m-auto mt-5 p-3 border">
                <div class="form-group mb-3">
                    <label for="inputUsername">Username</label>
                    <input type="username" class="form-control" id="inputEmail" placeholder="Enter Username"/>
                </div>
                <div class="form-group">
                    <label for="inputPassword">Password</label>
                    <input type="password" class="form-control" id="inputPassword" placeholder="Password"/>
                </div>

                <button type="register" class="btn btn-link mb-3">No Account? Register Here</button>

                <div class="text-center">
                    
                    <button type="submit" class="btn btn-primary">Login</button>
                </div>
                

            </form>
        </div>

    )
}

export default Login;
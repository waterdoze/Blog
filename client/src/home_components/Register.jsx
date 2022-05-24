import React, { useState } from "react";
import Reddle from "../apis/Reddle";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

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

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();
    const handleSubmit = (id) => {
        navigate(`/users/${id}/update`);
        e.preventDefault();
        const today = new Date();

        try {
            const response = await Reddle.post("/", {
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
    }

    return (
        <div>
            <div>
                <div className='display-1 text-center'>Reddle</div>
            </div>

            <form className="shadow w-25 m-auto mt-5 p-3 border">
                <div className="form-group mb-3">
                    <label htmlFor="inputUsername">Username</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="username" className="form-control" id="inputEmail" placeholder="Enter Username"/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="inputPassword" placeholder="Password"/>
                </div>

                <button type="register" className="btn btn-link mb-3">Already Have an Account? Login Here</button>

                <div className="text-center">
                    
                    <button onClick={() => handleSubmit(users.id)} type="submit" className="btn btn-primary">Register</button>
                </div>
                

            </form>
        </div>

    )
}

export default Register;
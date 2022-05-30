import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginContextProvider } from "./context/LoginContext";
import Register from "./routes/Register"
import UserUpdatePage from "./routes/UserUpdatePage";
import Login from "./routes/Login";
import MainPage from "./routes/MainPage";

const App = () => {
    return (
        <LoginContextProvider>
            <div>
                <Router>
                    <Routes>         
                        <Route path="/*" element={<Register/>}>
                            <Route path="login" element={<Login/>}/>
                            <Route path=":id/update" element={<UserUpdatePage/>}/>
                            <Route path="main" element={<MainPage/>}/>
                        </Route>
                    </Routes>
                </Router>
            </div>
        </LoginContextProvider>
    );
}

export default App;
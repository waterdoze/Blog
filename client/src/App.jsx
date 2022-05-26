import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginContextProvider } from "./context/LoginContext";
import Home from "./routes/Home";
import UserDetailPage from "./routes/UserDetailPage";
import UserUpdatePage from "./routes/UserUpdatePage";
import Login from "./routes/Login";
import MainPage from "./routes/MainPage";

const App = () => {
    return (
        <LoginContextProvider>
            <div>
                <Router>
                    <Routes>            
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/:id/update" element={<UserUpdatePage/>}/>
                        <Route path="/:id" element={<UserDetailPage/>}/>
                        <Route path="/main" element={<MainPage/>}/>
                    </Routes>
                </Router>
            </div>
        </LoginContextProvider>
    );
}

export default App;
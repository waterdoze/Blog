import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginContextProvider } from "./context/LoginContext";
import Home from "./routes/Home";
import UserDetailPage from "./routes/UserDetailPage";
import UserUpdatePage from "./routes/UserUpdatePage";

const App = () => {
    return (
        <LoginContextProvider>
            <div>
                <Router>
                    <Routes>            
                        <Route path="/" element={<Home/>}/>
                        <Route path="/user/:id/update" element={<UserUpdatePage/>}/>
                        <Route path="/user/:id" element={<UserDetailPage/>}/>
                    </Routes>
                </Router>
            </div>
        </LoginContextProvider>
    );
}

export default App;
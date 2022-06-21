import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginContextProvider } from "./context/LoginContext";
import { PostContextProvider } from "./context/PostContext";
import Register from "./routes/Register"
import UserUpdatePage from "./routes/UserUpdatePage";
import Login from "./routes/Login";
import MainPage from "./routes/MainPage";
import Layout from "./routes/Layout";
import Unauthorized from "./routes/Unauthorized";
import LinkPage from "./routes/LinkPage";
import Home from "./routes/Home";
import Missing from "./routes/Missing";
import RequireAuth from "./routes/RequireAuth";


const App = () => {
    return (
        <LoginContextProvider>
            <PostContextProvider>
                <div>
                    <Router>
                        <Routes>         
                            <Route path="/" element={<Layout/>}>
                                {/*public routes*/}
                                <Route path="register" element={<Register/>}/>
                                <Route path="login" element={<Login/>}/>
                                <Route path="unauthorized" element={<Unauthorized/>}/>
                                <Route path="linkpage" element={<LinkPage/>}/>
                                <Route path="main" element={<MainPage/>}/>
                                {/*protected routes*/}
                                <Route element={<RequireAuth/>}>
                                    <Route path="/" element={<Home/>}/>
                                    <Route path=":id/update" element={<UserUpdatePage/>}/>
                                    
                                </Route>

                                <Route path="*" element={<Missing/>}/>
                            </Route>
                        </Routes>
                    </Router>
                </div>
            </PostContextProvider>
        </LoginContextProvider>
    );
}

export default App;
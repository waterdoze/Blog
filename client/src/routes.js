import React from 'react';
import { Route, Routes, Navigate } from 'react-router';

import Home from './hooks/home';
import Header from './hooks/header';
import Profile from './hooks/profile';
import { BrowserRouter } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'
import AddPost from './components/AddPost';
import MainForum from './components/MainForum';
import ShowPost from './components/ShowPost';
import EditPost from './components/EditPost';


function PrivateRoute({ children }) {
    const { isAuthenticated } = useAuth0();
    return isAuthenticated ? children : <Navigate to="/mainforum" />;
}



const AllRoutes = () => {

    return (
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/post/:pid" element={<ShowPost />} />
                    <Route path="/mainforum" element={<MainForum />} />
                    <Route path="/profile" element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>
                        } 
                    />
                    <Route path="/addpost" element={
                            <PrivateRoute>
                                <AddPost />
                            </PrivateRoute>
                        } 
                    />
                    <Route path="/editpost/:pid" element={
                            <PrivateRoute>
                                <EditPost />
                            </PrivateRoute>
                        } 
                    />
                </Routes>
            </BrowserRouter>
    )
}

export default AllRoutes;
import Reddle from "../apis/Reddle";
import React from "react";
import { TextField } from "@mui/material"
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useProfile from "../context/useProfile";


const AddPost = () => {
    const { prof } = useProfile();

    let navigate = useNavigate();

    useEffect(() => {
        console.log(window.sessionStorage.getItem("userName"))
        console.log(parseInt(window.sessionStorage.getItem("userID")))

    },[])

    const handleAddPost = async (event) => {
        event.preventDefault();
        const data = {
            title: event.target.title.value,
            post: event.target.body.value,
            author: window.sessionStorage.getItem("userName"),
            user_id: parseInt(window.sessionStorage.getItem("userID"))
        }

        const result = await Reddle.post('/post', data)

        console.log(result)
        setTimeout(() => navigate('../profile'), 500);
    }

    const handleBack = () => {
        navigate(-1)
    }
    return (
        <div className="text-center">
            <div>AddPost</div>
            <form onSubmit={handleAddPost}>
                <TextField
                    id='title'
                    label='Title'
                    margin='normal'
                    />
                <br />
                <TextField
                    id='body'
                    label='Body'
                    multiline
                    maxRows='4'
                    margin="normal"
                    />
                <br />
                <button className='btn btn-primary' type='submit'> Submit </button>
            </form>
            <button className="btn btn-primary" onClick={handleBack}>Back</button>
        </div>
    );
};

export default AddPost;

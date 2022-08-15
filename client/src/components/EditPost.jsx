import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Reddle from "../apis/Reddle";

import { TextField } from "@mui/material";

const EditPost = () => {

    let navigate = useNavigate();

    const location = useLocation();
    const post = location.state.post;

    const [stateLocal, setState] = useState({
        title: post.title,
        post: post.post,
    });

    const handleTitleChange = (event) => {
        setState({ ...stateLocal, title: event.target.value });
    };

    const handlePostChange = (event) => {
        setState({ ...stateLocal, post: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const user_id = parseInt(window.sessionStorage.getItem("userID"));
        const username = window.sessionStorage.getItem("userName");
        const title = event.target.title.value;
        const bod = event.target.post.value;

        const data = {
            title: title,
            post: bod,
            post_id: post.pid,
            user_id: user_id,
            author: username,
        };
        const result = await Reddle.put("/post", data)
        console.log(result)
        
        setTimeout(() => navigate("/profile"), 500);
    };

    const HandleCancel = () => {
        navigate(-1)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="title"
                    label="title"
                    margin="normal"
                    value={stateLocal.title}
                    onChange={handleTitleChange}
                />
                <br />
                <TextField
                    id="post"
                    label="post"
                    multiline
                    rows="4"
                    margin="normal"
                    value={stateLocal.post}
                    onChange={handlePostChange}
                />
                <br />
                <button className="btn btn-primary" type="submit"> Submit </button>
            </form>
            <br />
            <button className="btn btn-primary" onClick={HandleCancel}> Cancel </button>
        </div>
    );
};

export default EditPost;

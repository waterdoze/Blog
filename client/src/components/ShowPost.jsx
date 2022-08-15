import React from "react";
import Reddle from "../apis/Reddle";
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle }from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useProfile from "../context/useProfile";


const ShowPost = (props) => {

    let navigate = useNavigate();

    const location = useLocation();
    const post = location.state.post;
    const { prof } = useProfile();

    const [comments, setComments] = useState([])
    const [curComment, setCurComment] = useState({
        open: false,
        comment: '',
        cid: ''
    })

    useEffect(() => {
        const getCommentsOfPost = async () => {
            try {
                const result = await Reddle.get(`/comment/all?post_id=${post.pid}`)
                setComments(result.data.data.comments)
            }
            catch (err) {
                console.log(err)
            }
            
        }
        getCommentsOfPost();

    },[])

    const handleBack = () => {
        navigate(-1)
    }

    const handleClickComment = (cid, comment) => {
        setCurComment({
            open: true,
            comment: comment,
            cid: cid
        })

        console.log(cid)
    }
    
    const handleClose = () => {
        setCurComment({
            open: false,
            comment: '',
            cid: '' 
        })
    }

    const handleCommentChange = (event) => {
        setCurComment(prevState => ({...prevState, comment: event.target.value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            comment: event.target.comment.value,
            post_id: post.pid,
            user_id: window.sessionStorage.getItem("userID"),
            author: window.sessionStorage.getItem("userName")
        }

        const result = await Reddle.post('/comment', data);

        setTimeout(() => navigate(0), 500);

    }

    const handleUpdate = async () => {
        const data = {
            comment: curComment.comment,
            cid: curComment.cid,
            user_id: parseInt(window.sessionStorage.getItem("userID")),
            author: window.sessionStorage.getItem("userName"),
            post_id: post.pid
        }

        const result = await Reddle.put('/comment', data);
        console.log(result)

        setCurComment(prevState => ({...prevState, open : false }))

        setTimeout(() => navigate(0), 500);
    }

    const handleDeleteComment = async () => {
        const cid = curComment.cid
        const result = await Reddle.delete(`/comment/single?cid=${cid}`)

        console.log(result);

        setTimeout(() => navigate(0), 500);
    }


    return (
    <div >
        <div>
            <h2>Post</h2>
                <h4>{post.title}</h4>
                <p>{post.post}</p>
                <small> ~ {post.author}</small>
        </div>
        <div>
            <h2>Comments</h2>
                {comments ? comments.map(comment => 
                <div key={comment.cid}>
                    <h3>{comment.comment}</h3>
                    <small>{comment.date_created}</small>
                    <p>By: {comment.author}</p>
                    {comment.user_id == parseInt(window.sessionStorage.getItem("userID")) ? <button className='btn btn-secondary'onClick={() => handleClickComment(comment.cid, comment.comment)}>Edit</button> : null}
                </div>) : null}
        </div>
        <div>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="comment"
                    label="comment"
                    margin="normal"
                />
                <button type="submit" className="btn btn-primary">Submit</button>

            </form>
        </div>
        <div>
            <Dialog
                open={curComment.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Edit Comment</DialogTitle>
                    <DialogContent>
                        <DialogContentText
                            id="alert-dialog-description"
                        >
                            <input type="text" value={curComment.comment} onChange={handleCommentChange}></input>
                        </DialogContentText>

                        <DialogActions>
                            <button onClick={() => handleUpdate()} >
                                Agree
                            </button>
                            <button onClick={handleClose}>
                                Cancel
                            </button>
                            <button onClick={handleDeleteComment}>
                                Delete
                            </button>
                        </DialogActions>
                    </DialogContent>
            </Dialog>
        </div>
        <button className="btn btn-primary" onClick={handleBack}>Back</button>
    </div>
    )
};

export default ShowPost;

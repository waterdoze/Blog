import React, { useEffect, useState } from "react";
import Reddle from "../apis/Reddle";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, Link } from "react-router-dom";

import { Card, Paper, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'


const Profile = () => {

    let navigate = useNavigate();

    const { user, isAuthenticated } = useAuth0();
    const [posts, setPosts] = useState([]);
    const [stateLocal, setState] = useState({ 
        open: false,
        post_id: null
    })

    useEffect(() => {
        const getPosts = async () => {
            try {
                const result = await Reddle.get(`/users/allposts?user_id=${window.sessionStorage.getItem("userID")}`);
                setPosts(result.data.data.post);
                console.log(result.data.data.post);

                // console.log(result)
            } catch (err) {
                console.log(err);
            }
        };

        getPosts();
    }, []);

    const handleClickOpen = (pid) => {
        setState({
            open: true,
            post_id: pid
        })
    }

    const handleClickClose = (event) => {
        setState({
            open: false,
            post_id: null
        })
    }

    const DeletePost = async (event) => {
        event.preventDefault();
        const post_id = stateLocal.post_id;

        await Reddle.delete(`/comment/postcomments?post_id=${post_id}`)
        await Reddle.delete(`/post?post_id=${post_id}`);

        setTimeout(() => navigate('/'), 500);
    }

    const toHome = () => {
        navigate("../");
    };

    const toAddPost = () => {
        navigate("../addpost");
    };

    return (
        <div>
            <div className="text-center">
                <h1>{user.name}</h1>
                <br />
                <img src={user.picture} alt={user.name} />
                <br />
                <h4> {user.email}</h4>
                <br />
                <h6> Email Verified: </h6>
                {user.email_verified ? <p>Yes</p> : <p>No</p>}
                <br />
            </div>
            <div>
                <h2>My Posts</h2>
                {posts ? posts.map(post => 
                 <Card key={post.pid} style={{width: '500px', height: '150px', marginBottom: '10px', paddingBottom: '80px' }}>


                    <CardHeader
                    title={<Link to={'/post/' + post.pid} state={{post}}>
                                {post.title}
                            </Link> }
                    subheader={
                        <div className="FlexColumn">
                            <div className="FlexRow">
                                {post.date_created}
                            </div>
                            <div className="FlexRow">
                                <Link to={'/editpost/' + post.pid} state={{post}}>
                                    <button className="btn btn-secondary">
                                        Edit
                                    </button>
                                </Link>
                                <button className="btn btn-secondary" onClick={() => handleClickOpen(post.pid)}>
                                    Delete
                                </button>
                            </div>  
                        </div>
                        }
                        />
                    <br />
                </Card>) : null}
            </div>
            <div>
                <Dialog
                open={stateLocal.open}
                onClose={handleClickClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title"> Confirm Delete? </DialogTitle>
                        <DialogContent>
                            <DialogContentText
                                id="alert-dialog-description"
                            >
                                Deleting Post
                            </DialogContentText>
                            <DialogActions>
                                <button className="btn btn-secondary" type="button" onClick={DeletePost}>
                                    Agree
                                </button>
                                <button className="btn btn-secondary" onClick={handleClickClose}>
                                    Cancel
                                </button>
                            </DialogActions>
                        </DialogContent>
                </Dialog>
            </div>
                
            <div>
                <button className="btn btn-primary" onClick={() => toHome()}>
                    Home
                </button>
                <button className="btn btn-primary" onClick={() => toAddPost()}>
                    Add Post
                </button>
            </div>
        </div>
    );
};

export default Profile;

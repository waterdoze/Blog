import React from "react";
import { Card, CardContent, CardHeader } from '@mui/material';
import { ThumbUp, ThumbUpOutlined } from '@mui/icons-material';
import Reddle from "../apis/Reddle";
import moment from "moment";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



const MainForum = () => {

    let navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [pressed, setPressed] = useState(true);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const result = await Reddle.get('/posts')
                setPosts(result.data.data.posts)

                // console.log(result)
            }
            catch (err) {
                console.log(err)
            }
            
        }

        getPosts();
    },[])

    useEffect(() => {
        const getPosts = async () => {
            try {
                const result = await Reddle.get('/posts')
                setPosts(result.data.data.posts)

                // console.log(result)
            }
            catch (err) {
                console.log(err)
            }
            
        }

        getPosts();
    },[pressed])

    const handleToProfile = () => {
        navigate('../profile')
    }

    const handleLikes = async (pid) => {
        const result = await Reddle.put(`/like`, {
            user_id: window.sessionStorage.getItem("userID"),
            post_id: pid
        })

        setPressed(!pressed);

    }

    return (

        <div>
            <h1>Posts</h1>
            <div>
                {posts ? posts.map(post => 
                <Card key={post.pid} style={{margin: '15px', boxShadow: '5px 10px 5px #888888'}}>
                    <CardHeader
                    title={<Link to={'/post/' + post.pid} state={{post}}>
                                {post.title}
                            </Link> }
                    subheader={
                        <div className="FlexColumn">
                            <div className="FlexRow">
                            {  moment(post.date_created).format('MMMM Do, YYYY | h:mm a') }
                            </div>
                            <div className="FlexRow">
                                By:
                                <Link style={{paddingLeft: '5px', textDecoration: 'none'}}
                                        to={"/user/" + post.author} state={{post}}>
                                { post.author }
                                </Link>
                            </div>
                            <div className="FlexRow">
                                {post.like_user_id.includes(parseInt(window.sessionStorage.getItem("userID"))) ?
                                    <ThumbUp onClick={() => handleLikes(post.pid)}>upvotes</ThumbUp> :
                                    <ThumbUpOutlined onClick={() => handleLikes(post.pid)}>upvotes</ThumbUpOutlined>
                                }
                                
                                <div className="notification-num-allposts"> {post.likes} </div>
                            </div>
                        </div>
                        }
                    />
                    <br />
                    <CardContent>
                        <span style={{overflow: 'hidden' }}> {post.body} </span>
                    </CardContent>
                </Card>) : null}
            </div>
            <button className="btn btn-primary" onClick={handleToProfile}>Profile</button>


        </div>

    )
};

export default MainForum;
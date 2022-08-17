import React, { useState, useEffect } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";

import Reddle from "../apis/Reddle";
import moment from "moment";
import { Card, CardContent, CardHeader } from "@mui/material"

const ShowUser = (props) => {
    let navigate = useNavigate();

    const location = useLocation();
    const post = location.state.post;

    const [profile, setProfile] = useState({});
    const [userPosts, setPosts] = useState([]);

    useEffect(() => {

        const getUserAndPosts = async () => {

            try {
                const username = post.author;
                
                const result1 = await Reddle.get(`/users/otherprofile?name=${username}`);
                const result2 = await Reddle.get(`/users/otherprofilePosts?name=${username}`);

                setProfile(result1.data.data.user[0])
                setPosts(result2.data.data.post)

                console.log(result1.data.data.user[0]);
                console.log(result2.data.data.post);

                window.scrollTo({ top: 0, left: 0 });
            }
            catch (err) {
                console.log(err)
            }
            
        }

        getUserAndPosts();
        
    }, [post.author]);

    const handleBack = () => {
        navigate(-1);
    }

    return (
        <div>
            <div className="FlexRow">
                {profile ? 
                <div>
                    <div className="FlexRow">
                        <h1>{profile.name}</h1>
                    </div>

                </div> : null}
            </div>

            <br />

            <h3> Latest Activity:</h3>
            <div className="FlexColumn">
                {userPosts
                    ? userPosts.map((post) => (
                        <div key={post.pid}>
                            <Card className="CardStyles" style={{margin: '15px', boxShadow: '5px 10px 5px #888888'}}>
                                <CardHeader
                                    title={
                                        <Link to={"/post/" + post.pid} state = {{post}} >
                                            {post.title}
                                        </Link>
                                    }
                                    subheader={
                                        <div>
                                            <div>
                                                {moment(post.date_created).format("MMMM Do, YYYY | h:mm a")}
                                            </div>
                                            <div>{post.author}</div>
                                        </div>
                                    }
                                />
                                <CardContent>
                                    <span style={{ overflow: "hidden" }}>
                                        {post.post}{" "}
                                    </span>
                                </CardContent>
                            </Card>
                        </div>
                      )) : null}
            </div>

            <div>
                <button className="btn btn-primary" onClick={handleBack}>Back</button>
            </div>
        </div>
    );
};

export default ShowUser;

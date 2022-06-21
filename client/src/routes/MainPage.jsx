import React from "react";
import { useEffect, useContext } from "react";
import Reddle from "../apis/Reddle";
import { PostContext } from "../context/PostContext";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ALL_POSTS_URL = "/posts";

const MainPage = () => {
    
    const { posts, setPosts } = useContext(PostContext);
    const { auth } = useAuth();
    let navigate = useNavigate();

    const HandlePost = (id) => {
        navigate(`/posts/${id}`);
    }

    useEffect(() => {
        
        const fetchPosts = async () => {
            try {
                const response = await Reddle.get(
                    ALL_POSTS_URL,
                    {
                        headers: { Authorization: `Bearer ${auth['accessToken']}`}
                    }
                );

                console.log(response);
                setPosts(response.data.data.posts);
            }
            catch (err) {
                console.log(err);
            }
        }

        fetchPosts();



    },[])

    return (
        <section>
            <div className="list-group">
                <table className="table table-hover table-dark">
                    <thead>
                        <tr className="bg-primary">
                            <th scope="col">Title</th>
                            <th scope="col">Upvotes</th>
                            <th scope="col">Downvotes</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => {
                            return (
                                <tr>
                                    <td>{post.title}</td>
                                    <td>{post['upvotes']}</td>
                                    <td>{post['downvotes']}</td>
                                    <td>
                                        <button onClick={() => HandlePost(post.id)} type="button" className="btn btn-warning btn-lg">Open</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

            </div>
        </section>
    );
}

export default MainPage;
import React from "react";
import { Table } from '@mui/material';
import { TableBody } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableRow } from '@mui/material';
import { Paper } from '@mui/material';
import Reddle from "../apis/Reddle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



const MainForum = () => {

    let navigate = useNavigate();
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getPosts = async () => {
            try {
                const result = await Reddle.get('/posts')
                setPosts(result.data.data.posts)
                console.log(result.data.data.posts)

                // console.log(result)
            }
            catch (err) {
                console.log(err)
            }
            
        }

        getPosts();
    },[])

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <div>
            <h1>Posts</h1>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Title
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts ? posts.map(post => 
                            <TableRow key={post.pid}>
                                <TableCell>
                                    <Link to={'/post/' + post.pid} state={{post}}  >
                                        <h4>{post.title}</h4>
                                    </Link>
                                </TableCell>
                            </TableRow>) : null}
                    </TableBody>
                </Table>
            </Paper>

            <button className="btn btn-primary" onClick={handleBack}>Back</button>
        </div>

    )
};

export default MainForum;
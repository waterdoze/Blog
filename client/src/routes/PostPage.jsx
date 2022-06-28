import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import usePost from '../hooks/usePost';

const PostPage = (props) => {

    const { id } = useParams();
    const theID = id;
    const { posts } = usePost();

    console.log(posts)
    console.log(theID)
    const post = posts.find(p => p.pid == theID);
    console.log(post);

    return (
        <div>
            <h1 className='text-center'>POST</h1>
            <div>
                <p>
                    {post.post}
                </p>
            </div>
        </div>
    )
}

export default PostPage
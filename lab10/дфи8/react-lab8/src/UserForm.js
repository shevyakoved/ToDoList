import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostAndUserForm({ postId }) {
    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPostAndUser = async() => {
            try {
                const [postResponse, userResponse] = await Promise.all([
                    axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`),
                    axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`),
                ]);
                setPost(postResponse.data);
                setUser(userResponse.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchPostAndUser();


    }, [postId]);

    return ( <
            div > {
                error && < div > Error: { error } < /div>} {
                    post && user && ( <
                        div >
                        <
                        div >
                        <
                        strong > Title: < /strong> {post.title} <
                        /div> <
                        div >
                        <
                        strong > Body: < /strong> {post.body} <
                        /div> <
                        div >
                        <
                        strong > Name: < /strong> {user.name} <
                        /div> <
                        div >
                        <
                        strong > Email: < /strong> {user.email} <
                        /div> <
                        /div>
                    )
                } {
                    !post && !error && < div > Loading... < /div>} <
                        /div>
                );
            }

            export default PostAndUserForm;
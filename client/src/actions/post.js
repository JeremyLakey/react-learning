import { POST_ERROR, GET_POSTS, GET_POST, UPDATE_LIKES, LIKES_ERROR, DELETE_POST, ADD_POST, ADD_COMMENT, REMOVE_COMMENT } from "./types";
import axios from 'axios';
import { setAlert } from "./alert";


// Get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/post');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
};


// Toggle Like
export const toggleLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/post/like/${postId._id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {postId: postId._id, likes: res.data},
        })
    } catch (err) {

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
};

// Add post
export const addPost = formData => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        }


        const res = await axios.post(`/api/post`, formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data },
        );

        dispatch(setAlert("Post Added", "success"))
    } catch (err) {
        console.error(err);
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}


// Get posts
export const getPost = postId => async dispatch => {
    try {
        const res = await axios.get(`/api/post/${postId}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (err) {

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
};

export const deletePost = postId => async dispatch => {
    try {
        await axios.delete(`/api/post/${postId}`);

        dispatch({
            type: DELETE_POST,
            payload: postId },
        );

        dispatch(setAlert("Post Deleted", "success"))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Add Comment
export const addComment = (postId, formData) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        }


        const res = await axios.post(`/api/post/comment/${postId}`, formData, config);
        
        dispatch({
            type: ADD_COMMENT,
            payload: res.data },
        );

        dispatch(setAlert("Comment Added", "success"))
    } catch (err) {
        console.error(err);
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Delete Comment
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        await axios.delete(`/api/post/comment/${postId}/${commentId}`);
        
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId},
        );

        dispatch(setAlert("Comment Removed", "success"))
    } catch (err) {
        console.error(err);
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}
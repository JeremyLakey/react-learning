import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import { toggleLike, deletePost, getPosts } from '../../actions/post';

const PostItem = ({toggleLike, deletePost, getPosts, doFirstLoad, posts, postCheck, showItems, auth, post: {_id, text, name, avatar, user, likes, comments, date}}) => {
    
    const [likesCount, setLikeCount] = useState(0);
    const [firstLoad, setFirstLoad] = useState(doFirstLoad);

    useEffect(()=>{
        if(firstLoad) {
            getPosts();
            setFirstLoad(false);
        }
        let index = posts.findIndex(post => post._id === _id)
        if (posts === -1 || !posts[index] || !posts[index].likes) {
            setLikeCount(likes.length);
        }
        else {
            setLikeCount(posts[index].likes.length)
        }
    } , [posts]);

    return (
        <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                className="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
             {text /* User Post */} 
            </p>
             <p className="post-date">
                <Moment formate='YYYY/MM/DD'>{date}</Moment>
            </p>
            <button type="button" className="btn btn-light" onClick={ e =>toggleLike({_id})}>
              <i className="fas fa-thumbs-up"></i>{' '}
              {likesCount > 0 && <span>{likesCount}</span>}
            </button>
            {showItems && (<Fragment>
            <Link to={`/post/${_id}`} className="btn btn-primary">
              Discussion {comments.length !== 0 && <span className='comment-count'>{comments.length}</span>}
            </Link>
            {!auth.loading && user === auth.user._id && (
                <button      
                type="button"
                className="btn btn-danger"
                onClick={e => deletePost(_id)}>
                    <i className="fas fa-times"></i>
                </button>
            )}
            </Fragment>
            )}
          </div>
        </div>
    )
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    toggleLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    showItems: PropTypes.bool.isRequired,
    posts: PropTypes.array.isRequired,
    postCheck: PropTypes.object.isRequired,
}

PostItem.defaultProps = {
    showItems: true,
    doFirstLoad: false,
}

const mapStateToProps = state => ({
    auth: state.auth,
    posts: state.post.posts,
    postCheck: state.post
})

export default connect(mapStateToProps, {toggleLike, deletePost, getPosts})(PostItem);

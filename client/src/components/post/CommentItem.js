import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post';

const CommentItem = ({deleteComment, auth, comment: {text, user, name, date, avatar, _id}, postId})=> {
    return (
        <div class="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${user}`}>
                    <img className="roung-img" src={avatar}/>
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p class="my-1">{text}</p>
                <p>Posted on <Moment formate="YYYY/MM/DD">{date}</Moment></p>
                {!auth.loading && user === auth.user._id && <button className="btn btn-danger" onClick={e => deleteComment(postId, _id)}>Delete</button>}
            </div>
            
        </div>
    )
}

CommentItem.propTypes = {
    comment:PropTypes.object.isRequired,
    deleteComment:PropTypes.func.isRequired,
    postId:PropTypes.number.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth})

export default connect(mapStateToProps,{deleteComment})(CommentItem);

import React from 'react';
import { Link } from 'react-router';
import PostLink from './PostLink';
import PostInfo from './PostInfo';

const Post = ({ user, post }) => {
    return(
        <div className="post-wrapper">
            { post.get('note') &&
                <div className="post-note">
                    { post.get('note') }
                </div>
            }
            <PostLink post={ post } />
            <PostInfo post={ post } />
        </div>
    );
};

export default Post;


// {post.get('note')} /
// <a className="post-title" href={post.get('link')}>{post.get('title')}</a>
// <Link to={ `/post/${post.get('id')}` }>
//     comment / key( { post.get('id') })
// </Link>

import React from 'react';
import decode from 'ent/decode';


const PostLink = ({ post }) => {
    return(
        <div className="post-link-wrapper">
            <div className="post-title">
                <a href={ post.get('link') }>{ decode(post.get('title')) }</a>
            </div>
            <div className="post-description">
                { decode(post.get('description')) }
            </div>
            <span className="post-source">
                <a href={ post.get('source') }>{ post.get('source') }</a>
            </span>
        </div>
    );
};

export default PostLink;

import React from 'react';
import decode from 'ent/decode';
import { Link } from 'react-router';

const PostLink = ({ post }) => {
    return(
        <div className="post-link-wrapper">
            <div className="post-title">
                {decode(post.get('title'))}
            </div>
            <div className="post-description">
                { decode(post.get('description')) }
            </div>
            <span className="post-source">
                <b>원문 읽기</b> <a href={`//${post.get('source')}`}>{ post.get('source') }</a>
            </span>
        </div>
    );
};

export default PostLink;

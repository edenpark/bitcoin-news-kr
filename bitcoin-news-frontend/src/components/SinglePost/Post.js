import React, { Component } from 'react';
import decode from 'ent/decode';

class Post extends Component {

    render() {
        const { post, user } = this.props;

        return(
            <div className="post-wrapper">
                {post.get('note')}
                / { post.get('title')}
            </div>

        );
    }
}

export default Post;

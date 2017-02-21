import React, { Component } from 'react';
import PostCreatorLink from './PostCreatorLink';
import PostTimeAgo from './PostTimeAgo';
import PostCommentsLink from './PostCommentsLink';
import PostDeleteLink from './PostDeleteLink';
import Upvote from './Upvote';

class PostInfo extends Component {


    render() {
        const { post, user } = this.props;

        // const creatorIsLoggedIn = user.getIn(['user', 'uid']) === post.get('creatorUID');
        const creatorIsLoggedIn = false
        return(
            <div className="post-info-wrapper">
                <Upvote />
                <PostCreatorLink creator={ post.get('creator') } />
                <PostTimeAgo />
                <PostCommentsLink id={ post.get('id') } />
                { creatorIsLoggedIn && <PostDeleteLink post={ post } /> }
            </div>
        );
    }
}

export default PostInfo;

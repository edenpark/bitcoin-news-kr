import React from 'react';
import { Link } from 'react-router';
import { Icon } from 'semantic-ui-react';

const PostCommentsLink = ({ id }) => {
    return(
        <span className="post-info-item comment">
            <Link to={ `post/${id}` }>
                <Icon name='comment outline' /> 2 코멘트 | 코멘트 작성
            </Link>
        </span>
    );
};

export default PostCommentsLink;

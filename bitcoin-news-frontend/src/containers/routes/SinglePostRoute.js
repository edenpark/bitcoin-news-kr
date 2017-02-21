import React, { Component } from 'react';

import SinglePost, {
    LeftColumn,
    CenterColumn,
    RightColumn,
    Post
} from 'components/SinglePost/SinglePost';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as single from 'redux/modules/single';

import { Loader } from 'semantic-ui-react'

import postsHelper from 'helpers/firebase/database/posts';

class SinglePostRoute extends Component {

    componentDidMount() {
        const { handlePostLoad } = this;
        handlePostLoad();
    }

    handlePostLoad = async () => {
        const { postId } = this.props.params;
        const { SinglePostActions } = this.props;
        const data = await postsHelper.watchPost(postId);
        SinglePostActions.loadSinglePost(data);
    }

    render () {
        const { single, auth } = this.props;
        // const { title, description, note, link, source, creator, creatorUID } = single.get('post');

        const { postId }  = this.props.params;
        return (
            <SinglePost>
                <LeftColumn>
                    Left
                </LeftColumn>
                <CenterColumn>
                    {
                        single.get('loaded') ?
                        (
                            <Post
                                post={single.get('post')}
                                user={auth}
                                />
                        ) :
                        (
                            <Loader active inline='centered' />
                        )
                    }
                </CenterColumn>
                <RightColumn>
                    Right
                </RightColumn>
            </SinglePost>
        )
    }
}

SinglePostRoute = connect(
    state => ({
        single: state.single,
        auth: state.base.auth
    }),
    dispatch => ({
        SinglePostActions: bindActionCreators(single, dispatch)
    })
)(SinglePostRoute);

export default SinglePostRoute;

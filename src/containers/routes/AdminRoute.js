import React, { Component } from 'react';

import Admin, {
    FeedContainer
} from 'components/Admin/Admin';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as auth from 'redux/modules/base/auth';
import * as modal from 'redux/modules/base/modal';

import { Loader } from 'semantic-ui-react'

import usersHelper from 'helpers/firebase/database/users';
import postsHelper from 'helpers/firebase/database/posts';
import commentsHelper from 'helpers/firebase/database/comments';

class AdminRoute extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    }

    state = {
        verification: false
    }

    componentDidMount() {
        const { auth } = this.props;
        if(!auth.getIn(['profile', 'permission']) === 'admin') {
            this.context.router.push('/');
            return;
        }

        this.setState({
            verification: true
        })
    }

    render () {
        const { verification } = this.state;
        return (
            <Admin>
                {
                    verification ?
                    (
                        <FeedContainer />
                    ) :
                    <Loader />
                }

            </Admin>
        )
    }
}

AdminRoute = connect(
    state => ({
        auth: state.base.auth,
    }),
    dispatch => ({
        AuthActions: bindActionCreators(auth, dispatch),
        ModalActions: bindActionCreators(modal, dispatch)
    })
)(AdminRoute);

export default AdminRoute;

import React, { Component } from 'react';
import * as header from 'redux/modules/base/header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class App extends Component {
    componentDidMount() {
        const { HeaderActions } = this.props;
        HeaderActions.example();
    }

    render() {
        const { children } = this.props;

        return(
            <div>
                <h1>It's working!</h1>
                <h1>작동한다!</h1>
                {children}
            </div>
        );
    }
}

export default connect(
    state => ({
        status: {
            something: state.base.header.get('something')
        }
    }),
    dispatch => ({
        HeaderActions: bindActionCreators(header, dispatch)
    })
)(App);

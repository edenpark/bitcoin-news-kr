import React, { Component } from 'react';
import * as header from 'redux/modules/base/header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Load components
import Header, { BrandLogo, SidebarButton, AuthButton }  from 'components/Base/Header/Header';

class App extends Component {

    render() {
        const { children } = this.props;

        return(
            <div>
                <Header>
                    <SidebarButton />
                    <BrandLogo />
                    <AuthButton />
                </Header>
                {children}
            </div>
        );
    }
}

App = connect(
    state => ({
        status: {
            something: state.base.header.get('something')
        }
    }),
    dispatch => ({
        HeaderActions: bindActionCreators(header, dispatch)
    })
)(App);

export default App;

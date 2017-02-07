import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modal from 'redux/modules/base/modal';

// Load components
import Header, { BrandLogo, SidebarButton, AuthButton }  from 'components/Base/Header/Header';
import LoginModal, { SocialLoginButton } from 'components/Base/LoginModal/LoginModal';

class App extends Component {

    handleLoginModal = (() => {
        const { ModalActions } = this.props;
        return {
            open: (modalName) => {
                ModalActions.openModal({modalName: 'login'});
            },
            close: (modalName) => {
                ModalActions.closeModal('login');
            }
        }
    })()

    render() {
        const { children, status: {modal} } = this.props;
        const { handleLoginModal } = this;

        return(
            <div>
                <Header>
                    <SidebarButton />
                    <BrandLogo />
                    <AuthButton onClick={handleLoginModal.open}/>
                </Header>
                <LoginModal visible={modal.getIn(['login','open'])}
                            onHide={handleLoginModal.close}>
                    <SocialLoginButton type="github"/>
                    <SocialLoginButton type="google"/>
                    <SocialLoginButton type="facebook"/>
                </LoginModal>
                {children}
            </div>
        );
    }
}

App = connect(
    state => ({
        status: {
            modal: state.base.modal
        }
    }),
    dispatch => ({
        ModalActions: bindActionCreators(modal, dispatch)
    })
)(App);

export default App;

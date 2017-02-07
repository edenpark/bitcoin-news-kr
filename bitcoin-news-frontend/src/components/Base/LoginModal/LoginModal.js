import React, { Component } from 'react'
import Dimmer from 'components/Common/Dimmer';
import EyeCatchy from 'components/Common/EyeCatchy';

class LoginModal extends Component {

    render () {
        const { children, visible, onHide } = this.props;

        return (
            <div>
                <div className="login-modal-wrapper">
                    <EyeCatchy hidden={!visible} onHide={onHide}>
                        <div className="login-modal flipInX">
                            <div className="exit" onClick={onHide}>X</div>
                            <div className="logo">BitcoinNewsKR</div>
                            <div className="description">
                                <p>비트코인 유저들을 위한 한국어 뉴스</p>
                                <p>여러분들과 함께 정보를 나눔니다.</p>
                            </div>
                            <div className="buttons-wrapper">
                                {children}
                            </div>
                        </div>
                    </EyeCatchy>
                </div>
                { visible && <Dimmer /> }
            </div>
        );
    }
}

export { default as SocialLoginButton } from './SocialLoginButton';
export default LoginModal;

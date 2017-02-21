import React from 'react';
import { Icon } from 'semantic-ui-react';
import EyeCatchy from 'components/Common/EyeCatchy';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const UserMenu = ({username, visible, onHide, onLogOut}) => {
    return(
        <ReactCSSTransitionGroup
            transitionName={{
                enter: 'flipInX',
                leave: 'flipOutX'
            }}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
        >
        {
            visible && (
                <EyeCatchy onHide={onHide}>
                    <div className="user-menu-wrapper">
                        <div className="user-menu">
                            <div className="menu-item">
                                <div className="menu-name">
                                    <Icon name="user"/><span><b>@{username}</b></span>
                                </div>
                                <div className="description">내 <b>뉴스룸</b>으로 이동</div>
                            </div>
                            <div className="menu-item" onClick={onLogOut}>
                                <div className="menu-name">
                                    <Icon name="power"/><span>로그아웃</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </EyeCatchy>
            )
        }
        </ReactCSSTransitionGroup>
    );
};

export default UserMenu;

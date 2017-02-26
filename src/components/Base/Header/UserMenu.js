import React from 'react';
import { Link } from 'react-router';
import { Icon } from 'semantic-ui-react';
import EyeCatchy from 'components/Common/EyeCatchy';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const UserMenu = ({profile, visible, onHide, onLogOut}) => {
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
                                <Link to={`/profile/${profile.get('username')}`} onClick={onHide}>
                                    <div className="menu-name">
                                        <Icon name="user"/><span><b>@{profile.get('username')}</b></span>
                                        <div className="description">나의 <b>토빗</b></div>
                                    </div>
                                </Link>
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

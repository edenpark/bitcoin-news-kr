import React, { Component, PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside';

class Content extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUpdate(nextProps, nextState) {
        window.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = (e) => {
        if(e.keyCode === 27) {
            const { hide } = this.props;
            hide();
        }
    }

    render() {
        const { children } = this.props;
        return children;
    }

    handleClickOutside = () => {
        this.props.hide();
    }

}

Content = onClickOutside(Content);

class EyeCatchy extends Component {

    handleHide = () => {
        const { onHide } = this.props;
        onHide();
    }

    render() {
        const { children, hidden } = this.props;
        const { handleHide } = this;

        if(hidden) return null;
        return (
            <Content hide={handleHide}>
                {children}
            </Content>
        )
    }
}

EyeCatchy.propTypes = {
    onHide: PropTypes.func,
    hidden: PropTypes.bool,
}

export default EyeCatchy;

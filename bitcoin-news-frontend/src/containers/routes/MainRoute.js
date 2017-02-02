import React, { Component } from 'react';
import EyeCatchy from 'components/Common/EyeCatchy';

class MainRoute extends Component {

    state =  {
        hide: false
    }

    handleHide = () => {
        this.setState({
            hide: true
        })
    }

    handleShow = () => {
        this.setState({
            hide: false
        })
    }

    render () {
        const { hide } = this.state;
        const { handleHide, handleShow } = this;
        return (
            <div>
                <button onClick={handleShow}>날 눌러봐</button>
                <EyeCatchy hidden={hide} onHide={handleHide}>
                    <div>
                        나는 바깥을 클릭하거나, ESC를 누르면 사라지지
                    </div>
                </EyeCatchy>
            </div>
        )
    }
}

export default MainRoute;

import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class FeedContainer extends Component {

    state = {
        feeds: {}
    }


    render() {

        return(
            <div>
                <Button
                    content='RSS Feed Bring'
                    labelPosition='left'
                    icon='connectdevelop'
                    color="teal"
                    />
            </div>
        );
    }
}

export default FeedContainer;

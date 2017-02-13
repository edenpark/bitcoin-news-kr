import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'containers/Root';

import { browserHistory } from 'react-router';

import firebaseHelper from 'helpers/firebase';

// redux
import configureStore from 'redux/configureStore';

firebaseHelper.initialize();

const store = configureStore();

const rootElement = document.getElementById('root')

ReactDOM.render(
    <Root store={store}
        history={browserHistory} />, rootElement
);

import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'containers/Root';

import { browserHistory } from 'react-router';

import firebase from 'firebase';
import firebaseConfig from '../config/firebase';

// redux
import configureStore from 'redux/configureStore';

firebase.initializeApp(firebaseConfig);

const store = configureStore();

const rootElement = document.getElementById('root')

ReactDOM.render(
    <Root store={store}
        history={browserHistory} />, rootElement
);

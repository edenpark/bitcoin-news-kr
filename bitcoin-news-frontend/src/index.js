import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';

import firebase from 'firebase';
import firebaseConfig from '../config/firebase';

// redux
import configureStore from 'redux/configureStore';
import { Provider } from 'react-redux';

firebase.initializeApp(firebaseConfig);

const store = configureStore();

ReactDOM.render(
    (
        <Provider store={store}>
            <App />
        </Provider>
    ),
  document.getElementById('root')
);

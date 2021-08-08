import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { getFirebase, ReactReduxFirebaseProvider } from "react-redux-firebase";

import fbConfig from "./config/fbConfig";
import firebase from 'firebase/app';
import { createFirestoreInstance,getFirestore } from "redux-firestore";


const store = createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument({getFirebase ,getFirestore }))
);

const rrfProps = {
  firebase,
  config: fbConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
      </ReactReduxFirebaseProvider>
    </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);


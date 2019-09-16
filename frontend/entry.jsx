import React from "react";
import ReactDOM from "react-dom";
import Root from './components/root';
import configureStore from './store/store';
// import {postUser, postSession, deleteSession } from './utils/session_utils';
import {createNewUser, login, logout} from './actions/user_actions';


document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  let store;

  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser },
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState),
    delete window.currentUser;
  } else {
      store = configureStore();
  }

  window.login = login;
  window.logout = logout;
  window.getState = store.getState;
  window.dispatch = store.dispatch;

  ReactDOM.render(<Root store={store} />, root);
});
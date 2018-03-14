import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './Header/Header';
import Landing from './Landing/Landing';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import Thanks from './Thanks/Thanks';
import Discover from './Discover/Discover';
import Profile from './Profile/Profile';
import Chat from './Chat/Chat';
import { Container } from 'semantic-ui-react';
import store from '../../store';
import * as types from '../../store/users/actionTypes';

// restore last session
let user = localStorage.getItem('liu');
if (user !== null) {
  user = JSON.parse(user);
  store.dispatch({ type: types.SET_LIU, user });
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Container className='App' fluid>
            <Header />
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route path='/signup' component={Signup} />
              <Route path='/login' component={Login} />
              <Route path='/thanks' component={Thanks} />
              <Route path='/discover' component={Discover} />
              <Route path='/profile' component={Profile} />
              <Route path='/chat' component={Chat} />
              <Route render={function () {
                return <p>Not Found</p>
              }} />
            </Switch>
          </Container>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

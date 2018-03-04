import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Landing from './Landing/Landing';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import Thanks from './Thanks/Thanks';
import Discover from './Discover/Discover';
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
          <Container className='App'>
            <Header />
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route path='/signup' component={Signup} />
              <Route path='/login' component={Login} />
              <Route path='/thanks' component={Thanks} />
              <Route path='/discover' component={Discover} />
              <Route render={function () {
                return <p>Not Found</p>
              }} />
            </Switch>
            <Footer />
          </Container>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Landing from './Landing/Landing';
import Signup from './Signup/Signup';
import Thanks from './Thanks/Thanks';
import { Container } from 'semantic-ui-react'

class App extends Component {
  render() {
    return (

      <BrowserRouter>
        <Container className='App'>
          <Header />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/signup' component={Signup} />
            <Route path='/thanks' component={Thanks} />
            <Route render={function () {
              return <p>Not Found</p>
            }} />
          </Switch>
          <Footer />
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;

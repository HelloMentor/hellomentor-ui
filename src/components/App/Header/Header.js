import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import autoBind from 'react-autobind';
import { Image, Menu } from 'semantic-ui-react'
import { logout } from '../../../store/users/actions';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  submitLogout(event) {
    event.preventDefault();
    this.props.logoutUser();
    this.props.history.push('/');
  }

  render() {
    return (
      <Menu size='small'>
        <Menu.Item href='/'>
          <Image
            size='mini'
            src='/images/logos/mountains.png'
          />
        </Menu.Item>
        <Menu.Item header href='/'>
          HelloMentor
        </Menu.Item>
        {
          (this.props.liu && this.props.liu.f_name)
          ? <Menu.Menu position='right'>
              <Menu.Item name='discover' onClick={() => this.props.history.push('/discover')} />
              <Menu.Item name='chat' onClick={() => this.props.history.push('/chat')} />
              <Menu.Item name='profile' onClick={() => this.props.history.push('/profile')} />
              <Menu.Item name='logout' onClick={this.submitLogout} />
            </Menu.Menu>
          : <Menu.Item name='login' position='right' onClick={() => this.props.history.push('/login')} />
        }
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  return {
    liu: state.users.liu
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logoutUser() {
      dispatch(logout())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))

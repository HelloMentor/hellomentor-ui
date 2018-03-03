import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import autoBind from 'react-autobind';
import { Image, Menu } from 'semantic-ui-react'
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  goToLogin() {
    this.props.history.push('/login');
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
          this.props.liu.f_name
          ? <Menu.Item position='right'>Hello {this.props.liu.f_name}!</Menu.Item>
          : <Menu.Item name='login' position='right' onClick={this.goToLogin} />
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
  return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))

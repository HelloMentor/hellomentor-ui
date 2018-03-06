import React, { Component } from 'react';
import { Container, Icon, List, Menu } from 'semantic-ui-react'

class Header extends Component {
  render() {
    return (
      <Menu fixed='bottom'>
        <Container fluid>
          <Menu.Item position='left' style={{textAlign: 'left'}}>
            <List>
              <List.Item>HelloMentor Alpha 2018</List.Item>
            </List>
          </Menu.Item>
          <Menu.Item position='right'>
            <Icon name='facebook' />
            <a href='https://facebook.com/tryhellomentor'>Facebook</a>&nbsp;
            <Icon name='twitter' />
            <a href='https://twitter.com/tryhellomentor'>Twitter</a>&nbsp;
            <Icon name='linkedin' />
            <a href='https://www.linkedin.com/company/tryhellomentor'>LinkedIn</a>
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

export default Header;

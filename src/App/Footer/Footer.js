import React, { Component } from 'react';
import { Container, List, Menu } from 'semantic-ui-react'

class Header extends Component {
  render() {
    return (
      <Menu fixed='bottom'>
        <Container>
          <Menu.Item position='left' style={{textAlign: 'left'}}>
            <List>
              <List.Item>HelloMentor</List.Item>
              <List.Item>Alpha</List.Item>
              <List.Item>2018</List.Item>
            </List>
          </Menu.Item>
          <Menu.Item position='right' style={{textAlign: 'left'}}>
            <List>
              <List.Item><a href='https://facebook.com/tryhellomentor'>Facebook</a></List.Item>
              <List.Item><a href='https://twitter.com/tryhellomentor'>Twitter</a></List.Item>
              <List.Item><a href='https://www.linkedin.com/company/tryhellomentor'>LinkedIn</a></List.Item>
            </List>
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

export default Header;

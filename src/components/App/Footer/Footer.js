import React, { Component } from 'react';
import { Button, Container, List, Menu } from 'semantic-ui-react'

class Footer extends Component {
  render() {
    return (
      <Menu fixed='bottom' style={{ backgroundColor: '#f7f7f7', minHeight: '65px' }}>
        <Container fluid>
          <Menu.Item position='left' style={{textAlign: 'left'}}>
            <List>
              <List.Item><strong>PolyLink α</strong> - © 2018</List.Item>
            </List>
          </Menu.Item>
          <Menu.Item position='right'>
              <Button circular color='facebook' icon='facebook' as='a' href='https://facebook.com/polylink' />&nbsp;&nbsp;
              <Button circular color='twitter' icon='twitter' as='a' href='https://twitter.com/getpolylink' />&nbsp;&nbsp;
              <Button circular color='linkedin' icon='linkedin' as='a' href='https://www.linkedin.com/company/18463882' />
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

export default Footer;

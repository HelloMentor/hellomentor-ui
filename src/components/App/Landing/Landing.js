import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Card, Grid, Header, List } from 'semantic-ui-react'
import './Landing.css';

class Landing extends Component {
  state = { }

  constructor(props) {
    super();
  }

  componentDidMount() {
  }

  render() {
    return (
      <Container className='container-landing'>
        <Container>
          <Header as='h1' textAlign='left'>Build The Future, Together</Header>
          <div style={{textAlign: 'left'}}>We&#39;ll introduce you to a lifelong friend who will help you build your business and achieve your craziest dreams.</div>
        </Container>
        <Container style={{ marginTop: '3em'}}>
          <Card.Group className='centered'>
            <Grid container>
              <Grid.Column mobile={16} tablet={8} computer={8}>
                <Card fluid>
                  <Card.Content style={{ padding: '3em' }}>
                    <Card.Header textAlign='left'>
                      Find a Startup Mentor
                    </Card.Header>
                    <Card.Description>
                      <List bulleted style={{textAlign: 'left'}}>
                        <List.Item>Find ways to stimulate personal & professional growth</List.Item>
                        <List.Item>Grow your network</List.Item>
                        <List.Item>Gain motivation to attain your goals</List.Item>
                        <List.Item>Get life-long advice and friendship</List.Item>
                      </List>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Link to='/signup/?role=mentee'><Button primary>Sign Up</Button></Link>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={8}>
                <Card fluid>
                  <Card.Content style={{ padding: '3em' }}>
                    <Card.Header textAlign='left'>
                      Become a Startup Mentor
                    </Card.Header>
                    <Card.Description>
                      <List bulleted style={{textAlign: 'left'}}>
                        <List.Item>Change someone’s life</List.Item>
                        <List.Item>Build your leadership abilities</List.Item>
                        <List.Item>Increase the size of your network</List.Item>
                        <List.Item>Stay on top of new trends and emerging technologies</List.Item>
                      </List>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Link to='/signup/?role=mentor'><Button primary>Apply</Button></Link>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid>
          </Card.Group>
        </Container>
      </Container>
    );
  }
}

export default Landing;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container, Card, Grid, Header, List } from 'semantic-ui-react'
import Particles from 'particlesjs';
import Footer from '../Footer/Footer';
import './Landing.css';

class Landing extends Component {
  state = { }

  constructor(props) {
    super();
  }

  componentDidMount() {
    if (this.props.liu && this.props.liu.f_name) {
      this.props.history.push('/discover');
    } else {
      window.onload = function() {
        Particles.init({
          selector: '.background',
          maxParticles: 400,
          sizeVariations: 3,
          speed: 0.5,
          color: ['#2185d0'],
          minDistance: 70,
          connectParticles: true
        });
      }
    }
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
                    <Link to='/signup/?role=mentor'><Button primary>Sign Up</Button></Link>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid>
          </Card.Group>
          <canvas className='background'></canvas>
        </Container>
        <Footer />
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(Landing)

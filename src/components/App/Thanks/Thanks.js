import React, { Component } from 'react';
import { Container, Header, List } from 'semantic-ui-react'

class Thanks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: ''
    };
  }

  componentDidMount() {
    if (this.props.location.search === '?role=mentee') {
      this.setState({ type: 'mentee' });
    } else {
      this.setState({ type: 'mentor '});
    }
  }

  render() {
    return (
      <Container textAlign='left' style={{ marginTop: '2em', paddingBottom: '150px' }}>
          <Header as='h1'>Thanks for Signing Up</Header>
          <div>As we are still in beta, we will connect you with a { this.state.type === 'mentee' ? 'mentor' : 'mentee' } by <strong>email</strong> shortly. In the near future, we will provide a means for you to chat with your mentor in HelloMentor. We have a ton planned, so stay tuned.</div>
          <Header as='h3'>Next Steps</Header>
          <List ordered>
            <List.Item>
              We&#39;ll introduce you to a compatible can by email shortly.
            </List.Item>
            <List.Item>
              We recommend connecting with your { this.state.type === 'mentee' ? 'mentor' : 'mentee' } as a <em>friend</em>. We&#39;ve found that this increases your chances of getting great advice and making a lifelong connection.
            </List.Item>
            <List.Item>
              Connect with us on social media for product updates.
            </List.Item>
            <List.Item>
              If you have any suggestions, please send me an email at <a href='mailto:ben@hellomentor.io'>ben@hellomentor.io</a>. I&#39;d absolutely love to hear from you.
            </List.Item>
          </List>
      </Container>
    );
  }
}

export default Thanks;

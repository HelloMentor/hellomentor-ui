import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { Button, Card, Checkbox, Container, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'
import TwilioChat from 'twilio-chat';
import { fetchAllUsers } from '../../../store/users/actions';
import { getChatToken } from '../../../store/chat/actions';
import './Discover.css';

class Discover extends Component {
  constructor(props) {
    super(props);

    this.chatClient = null;
    this.state = {
      showMentors: true,
      showMentees: true
    };

    autoBind(this);
  }

  componentDidMount() {
    if (!this.props.liu.f_name) {
      this.props.history.push('/');
    }
    this.props.loadUsers();
  }

  toggleShowMentors(event) {
    this.setState({
      showMentors: !this.state.showMentors
    });
  }

  toggleShowMentees(event) {
    this.setState({
      showMentees: !this.state.showMentees
    });
  }

  sendMessage(toUser) {
    this.props.getTwilioChatToken(this.props.liu).then(() => {
      this.chatClient = new TwilioChat(this.props.chatToken.jwt);
      this.chatClient.createChannel({
        uniqueName: this.props.liu.id  + '_' + toUser.id + '_' + (new Date()).getTime(),
        friendlyName: this.props.liu.f_name + ' and ' + toUser.f_name
      });
    });
  }

  render() {
    return (
      <Container textAlign="left" style={{ marginTop: '2em', paddingBottom: '150px' }}>
        <Header as='h1'>Matches for {this.props.liu.f_name}</Header>
        <Header.Subheader>Based on your profile, we think these folks would make a great match for you. Send a few of them an email, and keep it casual! We've found that informal yet genuine reach-outs tend to work the best.</Header.Subheader>

        <Grid style={{ marginTop: '1em' }}>
          <Grid.Column width={3}>
            <Segment>
              <Header as='h3'>Filters</Header>
              <Form.Field>
                <Checkbox
                  toggle
                  label='Mentors'
                  checked={this.state.showMentors}
                  onChange={this.toggleShowMentors}
                />
              </Form.Field>
              <Form.Field style={{ paddingTop: '1em' }}>
                <Checkbox
                  toggle
                  label='Mentees'
                  checked={this.state.showMentees}
                  onChange={this.toggleShowMentees}
                />
              </Form.Field>
            </Segment>
          </Grid.Column>
          <Grid.Column width={13}>
            <Card.Group>
              {
                this.props.usersArray.map(user => {
                  return (
                    (user.role === 'Mentor' && this.state.showMentors) || (user.role === 'Mentee' && this.state.showMentees) ?
                      <Card key={user.id}>
                          <Card.Content>
                            <Image floated='right' size='mini' src={user.profile_image} />
                            <Card.Header>{user.f_name} {user.l_name}</Card.Header>
                            <Card.Meta>{user.headline} - {user.role}</Card.Meta>
                            <Card.Description>{user.summary}</Card.Description>
                          </Card.Content>
                          <Card.Content extra>
                            <Button basic fluid color='blue' as='a' onClick={() => this.sendMessage(user)}>Message</Button>
                          </Card.Content>
                      </Card>
                    : ''
                  )
                })
              }
            </Card.Group>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    usersById: state.users.usersById,
    usersArray: state.users.usersArray,
    liu: state.users.liu,
    chatToken: state.chat.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadUsers() {
      dispatch(fetchAllUsers())
    },
    getTwilioChatToken(user) {
      return dispatch(getChatToken(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Discover)

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { Button, Card, Checkbox, Container, Form, Grid, Header, Image, List, Modal, Segment } from 'semantic-ui-react'
import { fetchAllUsers, addChannelToLiu } from '../../../store/users/actions';
import { createChannel } from '../../../store/chat/actions';
import { pair } from '../../../services/chat';
import './Discover.css';

class Discover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMentors: true,
      showMentees: true,
      chatClient: null,
      moreInfoModalUser: {}
    };

    autoBind(this);
  }

  componentDidMount() {
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
    let liuChannels = this.props.liu.channels;
    let name = pair(this.props.liu.id, toUser.id).toString();
    let foundChannel;

    // Determine if liu has a conversation with toUser already
    if (liuChannels && liuChannels.length) {
      foundChannel = liuChannels.find(c => name === c.name);
    }

    // If so, join it. Otherwise, create it.
    if (foundChannel) {
      this.props.history.push('/chat/' + foundChannel.id);
    } else {
      this.props.createChannel({
        name: name,
        friendlyName: this.props.liu.f_name + ' and ' + toUser.f_name,
        type: 'direct',
        isPrivate: true,
        creator: this.props.liu.id,
        members: [this.props.liu.id, toUser.id],
        admins: [this.props.liu.id],
        description: 'A conversation between ' + this.props.liu.f_name + ' and ' + toUser.f_name
      }, this.props.liu).then((channel) => {
        this.props.history.push('/chat/' + channel.channel.id);
        this.props.addChannelToLiu(channel, this.props.liu);
      });
    }
  }

  openMoreInfoModal(user) {
    this.setState({ isMoreInfoModalOpen: true, moreInfoModalUser: user });
  }

  closeMoreInfoModal() {
    this.setState({ isMoreInfoModalOpen: false });
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
                            <div className='ui two buttons'>
                              <Button basic icon='send' content='Message' color='blue' as='a' onClick={() => this.sendMessage(user)}></Button>
                              <Button basic icon='info' content='More Info' color='grey' as='a' onClick={() => this.openMoreInfoModal(user)}></Button>
                            </div>
                          </Card.Content>
                      </Card>
                    : ''
                  )
                })
              }
            </Card.Group>
          </Grid.Column>
        </Grid>
        <Modal size='small' open={this.state.isMoreInfoModalOpen} onClose={this.closeMoreInfoModal} closeIcon>
          <Modal.Content>
            <Image src={this.state.moreInfoModalUser.profile_image} size='medium' circular />
            <div>{this.state.moreInfoModalUser.f_name + ' ' + this.state.moreInfoModalUser.l_name}</div>
            <div>{this.state.moreInfoModalUser.headline}</div>
            {
              (this.state.moreInfoModalUser.city && this.state.moreInfoModalUser.country) ?
                <div>
                  {this.state.moreInfoModalUser.city + ', ' + this.state.moreInfoModalUser.country}
                </div>
              : ''
            }
            <div>{this.state.moreInfoModalUser.summary}</div>
            {
              (this.state.moreInfoModalUser.skills && this.state.moreInfoModalUser.skills.length) ?
                <div>
                  <div>Skills</div>
                  <List items={this.state.moreInfoModalUser.skills} />
                </div>
              : ''
            }
            {
              (this.state.moreInfoModalUser.wanted_skills && this.state.moreInfoModalUser.wanted_skills.length) ?
                <div>
                  <div>Wanted Skills</div>
                  <List items={this.state.moreInfoModalUser.wanted_skills} />
                </div>
              : ''
            }
            {
              (this.state.moreInfoModalUser.linkedin_url) ?
                <div>
                  <div>LinkedIn Profile</div>
                  <a href={'https://linkedin.com/u/' + this.state.moreInfoModalUser.linkedin_url}>
                    {'https://linkedin.com/u/' + this.state.moreInfoModalUser.linkedin_url}
                  </a>
                </div>
              : ''
            }
          </Modal.Content>
          <Modal.Actions>
            <Button icon='send' content='Message' labelPosition='left' color='blue' as='a' onClick={() => this.sendMessage(this.state.moreInfoModalUser)}></Button>
          </Modal.Actions>
        </Modal>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    usersById: state.users.usersById,
    usersArray: state.users.usersArray,
    liu: state.users.liu
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadUsers() {
      dispatch(fetchAllUsers())
    },
    addChannelToLiu(channel, liu) {
      dispatch(addChannelToLiu(channel, liu))
    },
    createChannel(channel, liu) {
      return dispatch(createChannel(channel, liu))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Discover)

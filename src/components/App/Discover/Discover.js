import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { Button, Card, Checkbox, Container, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'
import { fetchAllUsers } from '../../../store/users/actions';
import './Discover.css';

class Discover extends Component {
  constructor(props) {
    super(props);

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
                            <Button basic color='blue' as='a' href={'mailto:' + user.email}>Send Email</Button>
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
    liu: state.users.liu
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadUsers() {
      dispatch(fetchAllUsers())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Discover)

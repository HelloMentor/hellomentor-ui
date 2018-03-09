import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { Button, Card, Container, Grid, Header, Image } from 'semantic-ui-react'
import { fetchAllUsers } from '../../../store/users/actions';
import './Discover.css';

class Discover extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    if (!this.props.liu.f_name) {
      this.props.history.push('/');
    }
    this.props.loadUsers();
  }

  render() {
    return (
      <Container textAlign="left" style={{ marginTop: '2em', paddingBottom: '150px' }}>
        <Grid>
          <Grid.Column width={16}>
            <Header as='h1'>{this.props.liu.role === 'Mentee' ? 'Mentors' : 'Mentees'} for {this.props.liu.f_name}</Header>
            {
              (this.props.liu.role === 'Mentee')
              ? <Header.Subheader>Based on your profile, we think these mentors could help you.</Header.Subheader>
              : <Header.Subheader>Based on your profile, we think you would make a good match for these mentees.</Header.Subheader>
            }
            <Card.Group style={{ marginTop: '2em' }}>
              {
                this.props.usersArray.map(user => {
                  return (
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

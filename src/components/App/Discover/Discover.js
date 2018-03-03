import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react'
import { fetchAllUsers } from '../../../store/users/actions';
import './Discover.css';

class Discover extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.props.loadUsers();
  }

  render() {
    return (
      <Container textAlign="left" style={{ marginTop: '2em', paddingBottom: '150px' }}>
        <div>
          {Object.keys(this.props.usersById).length ? JSON.stringify(this.props.usersById) : 'waiting'}
        </div>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    usersById: state.users.usersById
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

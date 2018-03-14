import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Message from './Message/Message';
// import { setLoggedInUser } from '../../../store/users/actions';

class MessageList extends Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object)
  }

  static defaultProps = {
    messages: [],
  }

  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <Container textAlign="left" fluid>
        {this.props.messages.map((message, i) => (
          <Message key={i} {...message} />
        ))}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList)

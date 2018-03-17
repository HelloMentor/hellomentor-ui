import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Message from './Message/Message';

class MessageList extends Component {
  static propTypes = {
    channel: PropTypes.object
  }

  static defaultProps = {
    channel: {}
  }

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidUpdate() {
    const objDiv = document.getElementById('MessageList');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    return (
      <Container id="MessageList" textAlign="left" fluid>
        {this.props.channel.messages.map((message, i) => (
          <Message key={i} author={message.user_fullname} {...message} />
        ))}
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
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList)

import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Container } from 'semantic-ui-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Message from './Message/Message';
import './MessageList.css';

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

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const objDiv = document.getElementById('MessageList');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    return (
      <Container id="MessageList" className="MessageList" textAlign="left" fluid>
        {this.props.channel.messages.map((message, i) => (
          <Message key={i} author={message.user_fullname} time={moment(new Date(message.createdAt)).format('h:mm a')} {...message} />
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

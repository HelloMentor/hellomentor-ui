import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Container, Grid } from 'semantic-ui-react';
import ChannelList from './ChannelList/ChannelList';
import MessageList from './MessageList/MessageList';
import MessageForm from './MessageForm/MessageForm';
import io from 'socket.io-client';
import { addMessage, receiveMessage } from '../../../store/chat/actions';
import './Chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.socket = io(process.env.API_URL);
    this.socket.on('server:message', message => {
      if (message.user_id !== this.props.liu.id) {
        this.props.receiveMessage(message);
      }
    });

    autoBind(this);
  }

  componentDidMount() {
    // let channelId = this.props.location.search.split('?channel=')[1];
  }

  handleNewMessage(text) {
    const message = {
      user_id: this.props.liu.id,
      user_fullname: this.props.liu.f_name + ' ' + this.props.liu.l_name,
      body: text,
      me: true
    };

    this.socket.emit('client:message', message);
    this.props.addMessage(message);
  }

  render() {
    return (
      <Container fluid>
        <Grid columns={16} divided style={{ height: 'calc(100vh - 4.5em)' }}>
          <Grid.Column width={2}>
            <ChannelList channels={ this.props.liu.channels } />
          </Grid.Column>
          <Grid.Column width={14}>
            <MessageList messages={ this.props.messages } />
            <MessageForm onMessageSend={ this.handleNewMessage } />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    liu: state.users.liu,
    channels: state.chat.channels,
    messages: state.chat.messages
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addMessage(message) {
      dispatch(addMessage(message));
    },
    receiveMessage(message) {
      dispatch(receiveMessage(message))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)

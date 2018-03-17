import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Container, Grid } from 'semantic-ui-react';
import ChannelList from './ChannelList/ChannelList';
import MessageList from './MessageList/MessageList';
import MessageForm from './MessageForm/MessageForm';
import io from 'socket.io-client';
import { sendMessage, receiveMessage, setCurrentChannel } from '../../../store/chat/actions';
import './Chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.currentChannelId = this.props.location.pathname.split('/')[2];
    this.props.setCurrentChannel(this.currentChannelId);

    this.socket = io(process.env.API_URL);
    this.socket.on('server:message', message => {
      // Do not accept if sent from me originally or if not part of this channel
      if ((message.user_id === this.props.liu.id) || (message.channel_id !== this.currentChannelId)) {
        return;
      }
      this.props.receiveMessage(message);
    });
  }

  componentDidMount() {
  }

  handleNewMessage(text) {
    const message = {
      user_id: this.props.liu.id,
      body: text,
      channel_id: this.currentChannelId
    };

    this.socket.emit('client:message', message);
    this.props.sendMessage(message, this.props.liu);
  }

  render() {
    if (!this.props.liu.channels || !this.props.liu.channels.length) {
      return null;
    }

    return (
      <Container fluid>
        <Grid columns={16} divided style={{ height: 'calc(100vh - 4.5em)' }}>
          <Grid.Column width={2}>
            <ChannelList channels={ this.props.liu.channels } />
          </Grid.Column>
          <Grid.Column width={14}>
            <MessageList messages={ this.props.currentChannel.messages } />
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
    currentChannel: state.chat.currentChannel
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendMessage(message, liu) {
      dispatch(sendMessage(message, liu));
    },
    receiveMessage(message) {
      dispatch(receiveMessage(message));
    },
    setCurrentChannel(channelId) {
      dispatch(setCurrentChannel(channelId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)

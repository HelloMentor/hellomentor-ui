import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Grid, Header } from 'semantic-ui-react';
import ChannelList from './ChannelList/ChannelList';
import MessageList from './MessageList/MessageList';
import MessageForm from './MessageForm/MessageForm';
import io from 'socket.io-client';
import { sendMessage, receiveMessage, setCurrentChannel, fetchChannels } from '../../../store/chat/actions';

class Chat extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    
    if (!this.props.liu.f_name) {
      this.props.history.push('/login');
    }

    // Current channel is the ID in the navbar
    this.currentChannelId = this.props.location.pathname.split('/')[2];

    // Fetch channels to set up channel list
    this.props.fetchChannels(this.props.liu)
      .then((channels) => {
        // If there is not a current channel, make it the general channel
        if (!this.currentChannelId) {
          this.currentChannelId = channels.find(c => c.name === 'general').id;
        }

        this.props.setCurrentChannel(this.currentChannelId);

        this.socket = io(process.env.REACT_APP_WS_ROOT);
        this.socket.on('server:message', message => {
          // Do not accept if sent from me originally or if not part of this channel
          if ((message.user_id === this.props.liu.id) || (message.channel_id !== this.currentChannelId)) {
            return;
          }
          this.props.receiveMessage(message);
        });
      });
  }

  handleNewMessage(text) {
    if (!text) {
      return;
    }
    
    const message = {
      user_id: this.props.liu.id,
      user_fullname: this.props.liu.f_name + ' ' + this.props.liu.l_name,
      body: text,
      channel_id: this.currentChannelId,
      createdAt: new Date()
    };

    this.socket.emit('client:message', message);
    this.props.sendMessage(message, this.props.liu);
  }

  render() {
    if (!this.props.channels.length || !this.props.currentChannel.name) {
      return null;
    }

    return (
        <Grid divided style={{ height: 'calc(100vh - 4.5em)' }}>
          <Grid.Column width={2}>
            <ChannelList channels={ this.props.channels } />
          </Grid.Column>
          <Grid.Column width={14}>
            <Header as='h3' style={{textAlign: 'left'}}>{ this.props.currentChannel.friendlyName }</Header>
            <MessageList channel={ this.props.currentChannel } />
            <MessageForm onMessageSend={ this.handleNewMessage } />
          </Grid.Column>
        </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    liu: state.users.liu,
    channels: state.chat.channels,
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
    },
    fetchChannels(liu) {
      return dispatch(fetchChannels(liu));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)

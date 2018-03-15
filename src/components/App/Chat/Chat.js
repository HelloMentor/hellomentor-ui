import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Container, Grid } from 'semantic-ui-react';
import ChannelList from './ChannelList/ChannelList';
import MessageList from './MessageList/MessageList';
import MessageForm from './MessageForm/MessageForm';
import TwilioChat from 'twilio-chat';
import { getChatToken } from '../../../store/chat/actions';
import './Chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      publicChannelDescriptors: [],
      privateChannelDescriptors: [],
      username: null,
      channel: null,
      chatClient: null
    }
    autoBind(this);
  }

  componentDidMount() {
    let channelId = this.props.location.search.split('?channel=')[1];

    this.props.getTwilioChatToken(this.props.liu).then(() => {
      this.setState({
        username: this.props.chatToken.identity,
        chatClient: new TwilioChat(this.props.chatToken.jwt)
      });
    })
    .then(this.joinChannel.bind(null, channelId ? channelId : 'general'))
    .then(this.fetchChannels);
  }

  fetchChannels() {
    return new Promise((resolve, reject) => {
      this.state.chatClient.getPublicChannelDescriptors().then((data) => {
        this.setState({ publicChannelDescriptors: data.state.items });
      });
    })
  }

  joinChannel = (uniqueName, data) => {
    return new Promise((resolve, reject) => {
      this.state.chatClient.getSubscribedChannels().then(() => {
        this.state.chatClient.getChannelByUniqueName(uniqueName).then((channel) => {
          this.setState({ channel })

          channel.on('messageAdded', ({ author, body }) => {
            this.addMessage({ author, body })
          })

          channel.join().then(() => {
            window.addEventListener('beforeunload', () => channel.leave())

            channel.getMessages().then((data) => {
              let messages = [];

              data.items.map(m => {
                return messages.push({
                  author: m.state.author,
                  body: m.state.body,
                  me: m.state.author === this.state.username
                });
              });

              this.setState({
                messages: messages
              });
            });
          }).catch(() => reject(Error('Could not join general channel.')))

          resolve(channel)
        }).catch(() => {})
      }).catch(() => reject(Error('Could not get channel list.')))
    })
  }

  addMessage(message) {
    const messageData = { ...message, me: message.author === this.state.username }
    this.setState({
      messages: [...this.state.messages, messageData],
    })
  }

  handleNewMessage(text) {
    if (this.state.channel) {
      this.state.channel.sendMessage(text);
    }
  }

  render() {
    return (
      <Container fluid>
        <Grid columns={16} divided style={{ height: 'calc(100vh - 4.5em)' }}>
          <Grid.Column width={2}>
            <ChannelList publicChannelDescriptors={ this.state.publicChannelDescriptors } privateChannelDescriptors={ this.state.privateChannelDescriptors } />
          </Grid.Column>
          <Grid.Column width={14}>
            <MessageList messages={ this.state.messages } />
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
    chatToken: state.chat.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getTwilioChatToken(user) {
      return dispatch(getChatToken(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)

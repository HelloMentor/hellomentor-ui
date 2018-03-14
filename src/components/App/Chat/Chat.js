import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Container } from 'semantic-ui-react';
import MessageList from './MessageList/MessageList';
import MessageForm from './MessageForm/MessageForm';
import TwilioChat from 'twilio-chat';
// import { setLoggedInUser } from '../../../store/users/actions';
import './Chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      username: null,
      channel: null,
      chatClient: null
    }
    autoBind(this);
  }

  componentDidMount() {
    this.setState({
      messages: [...this.state.messages, { body: `Connecting...` }],
    });

    fetch(process.env.REACT_APP_API_URL + '/chat/token')
      .then(res => res.json())
      .then((token) => {
        let twilioChat = new TwilioChat(token.jwt);

        this.setState({
          username: token.identity,
          chatClient: twilioChat
        });

        return twilioChat;
      })
      .then(this.joinGeneralChannel)
      .then(this.configureChannelEvents);
  }

  joinGeneralChannel = (chatClient) => {
    return new Promise((resolve, reject) => {
      chatClient.getSubscribedChannels().then(() => {
        chatClient.getChannelByUniqueName('general').then((channel) => {
          this.setState({ channel })

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
        }).catch(() => this.createGeneralChannel(chatClient))
      }).catch(() => reject(Error('Could not get channel list.')))
    })
  }

  createGeneralChannel = (chatClient) => {
    return new Promise((resolve, reject) => {
      this.addMessage({ body: 'Creating general channel...' })
      chatClient
        .createChannel({ uniqueName: 'general', friendlyName: 'General Chat' })
        .then(() => this.joinGeneralChannel(chatClient))
        .catch(() => reject(Error('Could not create general channel.')))
    })
  }

  configureChannelEvents(channel) {
    channel.on('messageAdded', ({ author, body }) => {
      this.addMessage({ author, body })
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
      <Container fluid style={{ height: '100%' }}>
        <MessageList messages={ this.state.messages } />
        <MessageForm onMessageSend={ this.handleNewMessage } />
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

export default connect(mapStateToProps, mapDispatchToProps)(Chat)

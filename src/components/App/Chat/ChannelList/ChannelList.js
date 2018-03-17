import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Container, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class ChannelList extends Component {
  static propTypes = {
    channels: PropTypes.arrayOf(PropTypes.object)
  }

  static defaultProps = {
    channels: []
  }

  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <Container textAlign="left" fluid style={{padding: '10px'}}>
        <Container>
          <Header as='h3'>Channels</Header>
          {this.props.channels.map((channel, i) => (
            (channel.type === 'community') ? <div key={i}><a href={'/chat/' + channel.id}>{channel.friendlyName}</a></div> : ''
          ))}
        </Container>
        <Container style={{marginTop: '20px'}}>
          <Header as='h3'>Direct Messages</Header>
          {this.props.channels.map((channel, i) => (
            (channel.type === 'direct') ? <div key={i}><a href={'/chat/' + channel.id}>{channel.friendlyName}</a></div> : ''
          ))}
        </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList)

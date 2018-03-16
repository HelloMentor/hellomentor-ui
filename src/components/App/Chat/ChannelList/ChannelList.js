import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Container } from 'semantic-ui-react';
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
      <Container textAlign="left" fluid>
        <div>
          <h3>Channels</h3>
          {this.props.channels.map((channel, i) => (
            (channel.type === 'community') ? <div key={i}>{channel.name}</div> : ''
          ))}
        </div>
        <div>
          <h3>Direct Messages</h3>
          {this.props.channels.map((channel, i) => (
            (channel.type === 'direct') ? <div key={i}>{channel.name}</div> : ''
          ))}
        </div>
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

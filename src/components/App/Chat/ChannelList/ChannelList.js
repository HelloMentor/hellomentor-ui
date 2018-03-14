import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class ChannelList extends Component {
  static propTypes = {
    publicChannelDescriptors: PropTypes.arrayOf(PropTypes.object),
    privateChannelDescriptors: PropTypes.arrayOf(PropTypes.object)
  }

  static defaultProps = {
    publicChannelDescriptors: [],
    privateChannelDescriptors: []
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
          {this.props.publicChannelDescriptors.map((channelDescriptor, i) => (
            <div key={i}>{channelDescriptor.friendlyName}</div>
          ))}
        </div>
        <div>
          <h3>Direct Messages</h3>
          {this.props.privateChannelDescriptors.map((channelDescriptor, i) => (
            <div key={i}>{channelDescriptor.friendlyName}</div>
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Message.css';

class Message extends Component {
  static propTypes = {
    author: PropTypes.string,
    body: PropTypes.string.isRequired,
    me: PropTypes.bool,
  }

  render() {
    const classes = classNames('Message', {
      me: this.props.me
    });

    return (
      <div className={classes}>
        {this.props.author && (
          <div>
            <span className="author">{this.props.author}</span>
            <span className="time">{this.props.time}</span>
          </div>
        )}
        {this.props.body}
      </div>
    )
  }
}

export default Message;

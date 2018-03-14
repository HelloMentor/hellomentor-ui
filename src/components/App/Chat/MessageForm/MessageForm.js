import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import './MessageForm.css'

class MessageForm extends Component {
  static propTypes = {
    onMessageSend: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    this.input.focus()
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    this.props.onMessageSend(this.input.value)
    this.input.value = ""
  }

  render() {
    return (
      <form className="message-form" onSubmit={this.handleFormSubmit}>
        <div className="input-container">
          <input
            type="text"
            ref={(node) => (this.input = node)}
            placeholder="Enter your message…"
          />
        </div>
        <div className="button-container">
          <button type="submit">Send</button>
        </div>
      </form>
    )
  }
}


function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm)

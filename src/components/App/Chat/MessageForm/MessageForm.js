import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Form, Icon, Input } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import './MessageForm.css'

class MessageForm extends Component {
  state = { field: '' };

  static propTypes = {
    onMessageSend: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    this.input.focus()
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleFormSubmit = (event) => {
    event.preventDefault()
    this.props.onMessageSend(this.state.field);
    this.setState({
      field: ''
    });
  }

  render() {
    return (
      <Container fluid style={{position: 'absolute', bottom: '15px'}}>
        <Form className="message-form" onSubmit={this.handleFormSubmit}>
          <Input
            name='field'
            value={this.state.field}
            fluid
            ref={(node) => (this.input = node)}
            placeholder="Type your message..."
            style={{float: 'left', width: '700px'}}
            onChange={this.handleChange}
            action={{ icon: 'send', content: 'Send', labelPosition: 'left', color: 'blue' }}
          />
        </Form>
      </Container>
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

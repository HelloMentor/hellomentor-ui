import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Button, Container, Form, Input } from 'semantic-ui-react'
import { login } from '../../../store/users/actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: ''
      }
    };

    autoBind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ user: { ...this.state.user, [name]: value }});
  }

  submitLogin(event) {
    event.preventDefault();
    this.props.loginUser(this.state.user);
    this.props.history.push('/discover');
  }

  render() {
    return (
      <Container textAlign="left" style={{ marginTop: '2em', paddingBottom: '150px' }}>
        <Form onSubmit={this.submitLogin}>
          <Form.Field>
            <label>Email</label>
            <Input name='email' type='email' placeholder='Email' value={this.state.user.email} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Input name='password' type='password' placeholder='Password' value={this.state.user.password} onChange={this.handleChange} />
          </Form.Field>
          <Button type='submit' value='Submit'>Login</Button>
        </Form>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    loginUser(user) {
      dispatch(login(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

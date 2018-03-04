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

  componentDidMount() {
    if (this.props.liu && this.props.liu.f_name) {
      this.props.history.push('/discover');
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ user: { ...this.state.user, [name]: value }});
  }

  submitLogin(event) {
    event.preventDefault();
    this.props.loginUser(this.state.user, this.props.history);
  }

  render() {
    return (
      <Container textAlign="left" style={{ marginTop: '2em', paddingBottom: '150px' }}>
        <Form onSubmit={this.submitLogin}>
          <Form.Field width={6}>
            <label>Email</label>
            <Input name='email' type='email' placeholder='Email' value={this.state.user.email} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field width={6}>
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
  return {
    liu: state.users.liu
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginUser(user, history) {
      dispatch(login(user)).then(() => {
        history.push('/discover');
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Button, Form, Header, Input } from 'semantic-ui-react'
import { login } from '../../../store/users/actions';
import './Login.css';

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
    this.props.loginUser(this.state.user)
      .then(() => {
        this.props.history.push('/discover');
      })
      .catch(err => {
        Promise.resolve(err).then(err => {
          if (err.message) {
            alert(err.message);
          } else {
            alert(err);
          }
        })
      });
  }

  render() {
    return (
      <div className='Login'>
        <Header textAlign='center' as='h2' style={{marginBottom: '2rem'}}>Login to PolyLink</Header>
        <Form onSubmit={this.submitLogin}>
          <Form.Field>
            <label>Email</label>
            <Input name='email' type='email' placeholder='Email' value={this.state.user.email} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Input name='password' type='password' placeholder='Password' value={this.state.user.password} onChange={this.handleChange} />
          </Form.Field>
          <Button primary type='submit' value='Submit'>Login</Button>
        </Form>
      </div>
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
    loginUser(user) {
      return dispatch(login(user));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Button, Container, Form, Header, Input, TextArea } from 'semantic-ui-react'
import 'react-datepicker/dist/react-datepicker.css';
import { setLoggedInUser, signup } from '../../../store/users/actions';
import './Signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        role: '',
        f_name: '',
        l_name: '',
        headline: '',
        email: '',
        city: '',
        country: '',
        dob: null,
        gender: '',
        linkedin_u_name: '',
        skills: [],
        wanted_skills: [],
        summary: '',
        channels: []
      },
      genderOptions: [
        { key: 'Male', text: 'Male', value: 'Male' },
        { key: 'Female', text: 'Female', value: 'Female' },
        { key: 'Non-binary or Third Gender', text: 'Non-binary or Third Gender', value: 'Non-binary or Third Gender' },
        { key: 'Other', text: 'Other', value: 'Other' },
      ],
      profile_image_file: null,
      imagePreviewUrl: ''
    };

    autoBind(this);
  }

  componentDidMount() {
    if (this.props.location.search === '?role=mentee') {
      this.setState({ user: { ...this.state.user, role: 'Mentee' }});
    } else {
      this.setState({ user: { ...this.state.user, role: 'Mentor' }});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ user: { ...this.state.user, [name]: value }});
  }

  handleSkillChange(tags) {
    this.setState({ user: { ...this.state.user, skills: tags }});
  }

  handleWantedSkillChange(tags) {
    this.setState({ user: { ...this.state.user, wanted_skills: tags }});
  }

  handleDobChange(date) {
    this.setState({ user: { ...this.state.user, dob: date }});
  }

  handleGenderChange(e, { value }) {
    this.setState({ user: { ...this.state.user, gender: value }});
  }

  handleGenderAddition(e, { value }) {
    this.setState({
      genderOptions: [{ text: value, value }, ...this.state.genderOptions],
    });
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        user: {
          ...this.state.user
        },
        profile_image_file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  signup() {
    this.props.signup(this.state.user, this.state.profile_image_file)
      .then(user => {
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
      <Container textAlign='left' style={{ marginTop: '2rem', paddingBottom: '1rem' }}>

        <Header as='h1' style={{paddingBottom: '1rem'}}>Sweet! Let's get you set up.</Header>

        <Form>
          <Header as='h3'>Your Account</Header>
          <Form.Field required width={6}>
            <label>Email</label>
            <Input name='email' placeholder='elmer@acme.com' onChange={this.handleChange} />
          </Form.Field>
          <Form.Field required width={6}>
            <label>Password</label>
            <Input name='password' type='password' placeholder='Something super secret, at least 7 chars long' onChange={this.handleChange} />
          </Form.Field>

          <Header as='h3'>About You</Header>
          <Form.Group>
            <Form.Field required width={6}>
              <label>First Name</label>
              <Input name='f_name' placeholder='Elmer' onChange={this.handleChange} />
            </Form.Field>
            <Form.Field required width={6}>
              <label>Last Name</label>
              <Input name='l_name' placeholder='Fudd' onChange={this.handleChange} />
            </Form.Field>
            <Form.Field width={4} className='field-image-upload'>
              <label>Profile Image</label>
              <Input className="fileInput"
                type="file"
                name="profile_image"
                onChange={(e) => this.handleImageChange(e)} />
              { this.state.imagePreviewUrl ? <img src={this.state.imagePreviewUrl} alt="profile" /> : '' }
            </Form.Field>
          </Form.Group>
          <Form.Field required width={12}>
            <label>Headline</label>
            <Input name='headline' placeholder='Founder at Acme Corp' onChange={this.handleChange} />
          </Form.Field>
          {
            (this.state.user.role === 'Mentee') ?
              <Form.Field required width={12}>
                <label>Summary</label>
                <TextArea name='summary' placeholder='Share a little about yourself and what you are looking for on PolyLink' onChange={this.handleChange} />
              </Form.Field>
            :
              <Form.Field required width={12}>
                <label>Summary</label>
                <TextArea name='summary' placeholder='Share a little about what makes you a great mentor' onChange={this.handleChange} />
              </Form.Field>
          }
          <Button primary onClick={this.signup}>SUBMIT</Button>
        </Form>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedInUser: state.users.loggedInUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setLiu(user) {
      dispatch(setLoggedInUser(user));
    },
    signup(user, profileImageFile) {
      return dispatch(signup(user, profileImageFile));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)

import React, { Component } from 'react';
import { Button, Container, Dropdown, Form, Input, TextArea } from 'semantic-ui-react'
import TagsInput from 'react-tagsinput';
import moment from 'moment';
import 'react-tagsinput/react-tagsinput.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        role: '',
        f_name: '',
        l_name: '',
        email: '',
        city: '',
        country: '',
        dob: null,
        gender: '',
        linkedin_url: '',
        skills: [],
        wanted_skills: [],
        summary: '',
        misc_desires: '',
      },
      genderOptions: [
        { key: 'Male', text: 'Male', value: 'Male' },
        { key: 'Female', text: 'Female', value: 'Female' },
        { key: 'Transgender', text: 'Transgender', value: 'Transgender' },
        { key: 'Non-binary or Third Gender', text: 'Non-binary or Third Gender', value: 'Non-binary or Third Gender' },
        { key: 'Other', text: 'Other', value: 'Other' },
      ]
    };

    this.signup = this.signup.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSkillChange = this.handleSkillChange.bind(this);
    this.handleWantedSkillChange = this.handleWantedSkillChange.bind(this);
    this.handleDobChange = this.handleDobChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleGenderAddition = this.handleGenderAddition.bind(this);
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

  signup() {
    fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: this.state.user
      })
    })
    .then(res => res.json())
    .then(user => {
      if (this.state.user.role === 'Mentee') {
        this.props.history.push('/thanks/?role=mentee');
      } else {
        this.props.history.push('/thanks/?role=mentor');
      }
    });
  }

  render() {
    return (
      <Container textAlign="left" style={{ marginTop: '2em', paddingBottom: '150px' }}>
        <Form>
          <Form.Group>
            <Form.Field required width={6}>
              <label>Email</label>
              <Input name='email' placeholder='Email' onChange={this.handleChange} />
            </Form.Field>
            <Form.Field required width={6}>
              <label>Password</label>
              <Input name='password' type='password' placeholder='Password' onChange={this.handleChange} />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field required width={6}>
              <label>First Name</label>
              <Input name='f_name' placeholder='First Name' onChange={this.handleChange} />
            </Form.Field>
            <Form.Field required width={6}>
              <label>Last Name</label>
              <Input name='l_name' placeholder='Last Name' onChange={this.handleChange} />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field width={6}>
              <label>City</label>
              <Input name='city' placeholder='City' onChange={this.handleChange} />
            </Form.Field>
            <Form.Field width={6}>
              <label>Country</label>
              <Input name='country' placeholder='Country' onChange={this.handleChange} />
            </Form.Field>
          </Form.Group>
          <Form.Field width={6}>
            <label>Date of Birth</label>
            <DatePicker
              selected={this.state.user.dob}
              onChange={this.handleDobChange}
              placeholderText='Click to select a date'
              showMonthDropdown
              showYearDropdown
              dropdownMode='select' />
          </Form.Field>
          <Form.Field width={4}>
            <label>Gender</label>
            <Dropdown
              options={this.state.genderOptions}
              placeholder='Choose Gender'
              search
              selection
              fluid
              allowAdditions
              value={this.state.user.gender}
              onAddItem={this.handleGenderAddition}
              onChange={this.handleGenderChange}
            />
          </Form.Field>
          <Form.Field width={6}>
            <label>LinkedIn Profile URL</label>
            <Input name='linkedin_url' placeholder='e.g. https://linkedin.com/u/janedoe' onChange={this.handleChange} />
          </Form.Field>
          <Form.Field width={10}>
            <label>Your skills (tab-separated)</label>
            <TagsInput value={this.state.user.skills} onChange={this.handleSkillChange} />
          </Form.Field>
          {
            (this.state.user.role === 'Mentee') ?
              <Form.Field width={10}>
                <label>Things you would like mentorship in (tab-separated)</label>
                <TagsInput value={this.state.user.wanted_skills} onChange={this.handleWantedSkillChange} />
              </Form.Field>
            :
              <Form.Field width={10}>
                <label>Things you would like to provide mentorship for (tab-separated)</label>
                <TagsInput value={this.state.user.wanted_skills} onChange={this.handleWantedSkillChange} />
              </Form.Field>
          }
          <Form.Field width={6}>
            <label>A summary about yourself</label>
            <TextArea name='summary' placeholder='A few sentences increases your chances of a great match' onChange={this.handleChange} />
          </Form.Field>
          {
            (this.state.user.role === 'Mentee') ?
              <Form.Field width={6}>
                <label>Anything else you would like to mention to help us find you a mentor</label>
                <TextArea name='misc_desires' placeholder='Anything else you would like to mention to help us find you a mentor' onChange={this.handleChange} />
              </Form.Field>
            :
              <Form.Field width={6}>
                <label>Anything else you would like to mention to help us find you a mentee</label>
                <TextArea name='misc_desires' placeholder='Anything else you would like to mention to help us find you a mentee' onChange={this.handleChange} />
              </Form.Field>
          }
          <Button primary onClick={this.signup}>SUBMIT</Button>
        </Form>
      </Container>
    );
  }
}

export default Signup;

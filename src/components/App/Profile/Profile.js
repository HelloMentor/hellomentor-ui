import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import TagsInput from 'react-tagsinput';
import { Button, Container, Dropdown, Form, Header, Icon, Input, TextArea } from 'semantic-ui-react';
import moment from 'moment';
import { updateUser } from '../../../store/users/actions';
import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    if (!this.props.liu.f_name) {
      this.props.history.push('/');
    }

    this.setState({
      user: JSON.parse(JSON.stringify(this.props.liu)),
      genderOptions: [
        { key: 'Male', text: 'Male', value: 'Male' },
        { key: 'Female', text: 'Female', value: 'Female' },
        { key: 'Non-binary or Third Gender', text: 'Non-binary or Third Gender', value: 'Non-binary or Third Gender' },
        { key: 'Other', text: 'Other', value: 'Other' },
      ],
      imagePreviewUrl: this.props.liu.profile_image,
      updateSuccess: false
    });
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

  updateProfile() {
    const { updateSuccess } = this.state.updateSuccess;
    this.props.updateProfile(this.state.user, this.state.profile_image_file, updateSuccess)
      .then(() => {
        this.setState({ updateSuccess: true });
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
      this.state && this.state.user &&
      <Container textAlign="left" style={{ marginTop: '2em', paddingBottom: '1rem' }}>

        <Header as='h1' style={{paddingBottom: '1rem'}}>Update Your Profile</Header>

        <Form>
          <Header as='h3'>About You</Header>
          <Form.Group>
            <Form.Field required width={6}>
              <label>First Name</label>
              <Input name='f_name' placeholder='Elmer' onChange={this.handleChange} value={this.state.user.f_name} />
            </Form.Field>
            <Form.Field required width={6}>
              <label>Last Name</label>
              <Input name='l_name' placeholder='Fudd' onChange={this.handleChange} value={this.state.user.l_name} />
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
            <Input name='headline' placeholder='Founder at Acme Corp' onChange={this.handleChange} value={this.state.user.headline} />
          </Form.Field>
          {
            (this.state.user.role === 'Mentee') ?
              <Form.Field required width={12}>
                <label>Summary</label>
                <TextArea name='summary' placeholder='Share a little about yourself and what you are looking for on PolyLink' onChange={this.handleChange} value={this.state.user.summary} />
              </Form.Field>
            :
              <Form.Field required width={12}>
                <label>Summary</label>
                <TextArea name='summary' placeholder='Share a little about what makes you a great mentor' onChange={this.handleChange} value={this.state.user.summary} />
              </Form.Field>
          }
          {
            (this.state.user.role === 'Mentee') ?
              <Form.Field width={12}>
                <label>Skills you would like mentorship in (tab-separated)</label>
                <TagsInput value={this.state.user.wanted_skills} onChange={this.handleWantedSkillChange} />
              </Form.Field>
            :
              <Form.Field width={12}>
                <label>Your skills (tab-separated)</label>
                <TagsInput value={this.state.user.skills} onChange={this.handleSkillChange} />
              </Form.Field>
          }
          <Form.Group>
            <Form.Field width={6}>
              <label>City</label>
              <Input name='city' placeholder='Hollywood' onChange={this.handleChange} value={this.state.user.city} />
            </Form.Field>
            <Form.Field width={6}>
              <label>Country</label>
              <Input name='country' placeholder='United States' onChange={this.handleChange} value={this.state.user.country} />
            </Form.Field>
          </Form.Group>

          <Header as='h3'>More About You</Header>
          <Form.Field width={6}>
            <label>Date of Birth</label>
            <DatePicker
              selected={this.state.user.dob ? moment(this.state.user.dob) : null}
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
            <label>LinkedIn Username</label>
            <Input name='linkedin_u_name' label="https://linkedin.com/u/" placeholder='wileycoyote' onChange={this.handleChange} value={this.state.user.linkedin_u_name} />
          </Form.Field>
          <Button primary onClick={this.updateProfile}>SUBMIT</Button>
          {
            (this.state.updateSuccess) ? <Icon name='check circle' color='green' size='large' /> : ''
          }
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
    updateProfile(user, profileImageFile, updateSuccess) {
      return dispatch(updateUser(user, profileImageFile));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

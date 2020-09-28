import React from 'react'
import Select from 'react-select'
import { registerUser } from '../../lib/api'

class Register extends React.Component {

  state = {
    formData: {
      username: '',
      email: '',
      genres: '',
      aboutMe: '',
      mySite: '',
      profilePicture: '',
      password: '',
      passwordConfirmation: ''
    },
    errors: {}
  }

  options = [
    { value: 'pop', label: 'pop' },
    { value: 'rock', label: 'rock' },
    { value: 'metal', label: 'metal' },
    { value: 'electronic', label: 'electronic' },
    { value: 'world', label: 'world' },
    { value: 'grime', label: 'grime' },
    { value: 'jazz/soul', label: 'jazz/soul' },
    { value: 'brunch', label: 'brunch' },
    { value: 'hip hop', label: 'hip hop' },
    { value: 'country', label: 'country' },
    { value: 'ambient', label: 'ambient' }
  ]


  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    const errors = { ...this.state.errors, [event.target.name]: ''}
    this.setState({ formData, errors })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      await registerUser(this.state.formData)
      this.props.history.push('/login')
    } catch (err) {
      this.setState({ errors: err.response.data.errors })
      console.log(this.state.errors)
    }
  }
  
  render() {
    return (

      <section>

        <div className="hero-gigs-indv text-center">
          <div className="hero-gigs-indv-txt">
            <h2>Sign Up</h2>
            <h4>Register with GigMe below!</h4>
          </div>
        </div>

        <div className="register-form-area">
          <div className="register-form">
            <form onSubmit={this.handleSubmit} className="box">
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    className={`input ${this.state.errors.username ? 'is-danger' : '' }`}
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={this.handleChange}
                    value={this.state.formData.username}
                  />
                </div>
                {this.state.errors.username && <small className="help is-danger">Username is required</small>}
              </div>

              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                  className={`input ${this.state.errors.email ? 'is-danger' : ''}`}
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={this.state.formData.email}
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.email && <small className="help is-danger">This email is already signed up</small>}
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className={`input ${this.state.errors.password ? 'is-danger' : ''}`}
                    type="password"
                    placeholder="password"
                    name="password"
                    value={this.state.formData.password}
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.password && <small className="help is-danger">{this.state.errors.password}</small>}
              </div>

              <div className="field">
                <label className="label">Password confirmation</label>
                <div className="control">
                  <input
                    className={`input ${this.state.errors.passwordConfirmation ? 'is-danger' : ''}`}
                    type="password"
                    placeholder="Password Confirmation"
                    name="passwordConfirmation"
                    value={this.state.formData.passwordConfirmation}
                    onChange={this.handleChange}
                  />  
                </div>
                {this.state.errors.passwordConfirmation && <small className="help is-danger">{this.state.errors.passwordConfirmation}</small>}
              </div>

              <div className="field">
                <label className="label">Website</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="genres"
                    placeholder="www.aboutme.com"
                    value={this.state.formData.genre}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Link to profile picture</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="profilePicture"
                    placeholder="www.profpic.com"
                    value={this.state.formData.profilePicture}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Pick your favourite genre</label>
                <div className="control">
                  <div className="control">
                  <Select options={this.options}
                  />
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label">Bio</label>
                <div className="control">
                  <textarea
                    className="textarea input"
                    name="aboutMe"
                    value={this.state.formData.aboutMe}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="field">
                <button type="submit" className="button">Sign Up</button>
              </div>

            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default Register

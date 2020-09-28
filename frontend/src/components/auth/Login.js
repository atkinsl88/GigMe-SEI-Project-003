import React from 'react'
import { loginUser } from '../../lib/api'
import { setToken } from "../../lib/auth"
import { popupNotification } from '../../lib/notification'

class Login extends React.Component {
  state = {
    formData: {
      username: '',
      email: '',
      password: ''
    },
    error: false
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData, error: false })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await loginUser(this.state.formData)
      setToken(res.data.token)
      popupNotification(`welcome back ${this.state.formData.username}`)
      this.props.history.push('/')
    } catch (err) {
      this.setState({ error: true })
    }
  }

  render() {
    return (

      <section>

<div className="hero-gigs-indv text-center">
          <div className="hero-gigs-indv-txt">
            <h2>Login</h2>
            <h4>Login to your account</h4>
          </div>
        </div>

        <div className="register-form-area">
          <div className="register-form">
            <form onSubmit={this.handleSubmit} className="box">

                <div className="field">
                  <label className="label">Username</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      placeholder="Username"
                      name="username"
                      onChange={this.handleChange}
                      value={this.state.formData.username}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      className={`input ${this.state.error ? 'is-danger': '' }`}
                      placeholder="Email"
                      name="email"
                      onChange={this.handleChange}
                      value={this.state.formData.email}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      type="password"
                      className={`input ${this.state.error ? 'is-danger' : ''}`}
                      placeholder="Password"
                      name="password"
                      onChange={this.handleChange}
                      value={this.state.formData.password}
                    />
                  </div>
                </div>
                {this.state.error && <small className="help is-danger">Sorry, your credentials were incorrect</small>}

                <div className="field">
                  <button className="button"
                    disabled={!this.state.formData.email || !this.state.formData.password}
                    type="submit">
                    Login
                  </button>
                </div>
                
              </form>
          </div>
        </div>

      </section>
    )
  }
}

export default Login
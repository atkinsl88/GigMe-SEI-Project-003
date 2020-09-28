import React from 'react'

import { createMessage } from '../../lib/api'

class Community extends React.Component {
  state = {
    messages: [],
    formData: {
      text: ''
    }
    
  }

  handleChange = event => {
    const formData = { ...this.state.formData.text, [event.target.name]: event.target.value }
    console.log(this.state.formData.text)
    this.setState({ formData })
  }

  handleSubmit = async event => {
    event.preventDefault()
    console.log('submit now')
    try {
      const res = await createMessage(this.state.formData)
      this.setState({ messages: res})
    } catch (err) {
      console.log(err.response.data)
    }
  }

  render() {
    return (
      <section>

        <div className="hero-community">
          <div className="hero-community-txt">
            <h1>Community</h1>
          </div>
        </div>

        <div className="message-box">
          <div>{this.state.messages.map(message => {
            return (
              <div key={message.id}>
                <p>{message.text}</p>
              </div>
            )
          })}

          </div>
        </div>

        <div className="chat-area">
          <div className="message-input">
            <div className="form-input">
              <form onSubmit={this.handleSubmit}>
                <div className="fields">
                  <input
                  type="text"
                  name="text"
                  onChange={this.handleChange}
                  value={this.state.formData.text}
                />
                </div>
                <div className="button">
                  <button type="submit" className="button is-link input">Send</button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </section>
    )
  }
}

export default Community

// className="button is-link input"
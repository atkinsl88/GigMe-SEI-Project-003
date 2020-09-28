import React from 'react'
import { createGig } from '../../lib/api'
import GigForm from './GigForm'
import { popupNotification } from '../../lib/notification'

class GigNew extends React.Component {
  state = {
    formData: {
      artistName: '',
      venue: '',
      venueAddress: '',
      genre: '',
      date: '',
      doorsAt: '',
      posterImage: '',
      hasBar: true,
      latitude: '',
      longitude: '',
      aboutEvent: '',
      eventPrice: ''
    }
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData })
  }

  handleSubmit = async event => {
    event.preventDefault()

    try {
      const res = await createGig(this.state.formData)
      popupNotification('You have successfuly added a new gig')
      this.props.history.push(`/gigs/${res.data._id}`)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  render() {
    return (
      <section>

        <div className="hero-gigs-indv text-center">
          <div className="hero-gigs-indv-txt">
            <h2>Create a new event</h2>
            <h4>Fill in the information below to create a new event</h4>
          </div>
        </div>
            <GigForm 
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              formData={this.state.formData}
              buttonText="Make my Gig"/> 
      </section>
    )
  }
}

export default GigNew
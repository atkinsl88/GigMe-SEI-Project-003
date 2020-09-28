import React from 'react'
import { getSingleGig, editGig } from '../../lib/api'
import GigForm from './GigForm'

class GigEdit extends React.Component {

  state = {
    formData: {
      artistName: '',
      venue: '',
      venueAddress: '',
      genre: '',
      date: '',
      doorsAt: '',
      posterImage: '',
      hasBar: '',
      latitude: '',
      longitude: '',
      aboutEvent: '',
      eventPrice: '',
      comments: [],
      likes: []
    }
  }

  async componentDidMount() {
    const gigID = this.props.match.params.id
    try {
      const res = await getSingleGig(gigID)
      this.setState({ formData: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const gigID = this.props.match.params.id
    try {
      const res = await editGig(this.state.formData, gigID)
      this.props.history.push(`/gigs/${res.data._id}`)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <GigForm 
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              formData={this.state.formData}
              buttonText="Edit my Gig"
              /> 
          </div>
        </div>
      </section>
    )
  }
}

export default GigEdit
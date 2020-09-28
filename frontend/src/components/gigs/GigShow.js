import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { createLike, createComment, deleteGig } from '../../lib/api.js'
import { isAuthenticated } from '../../lib/auth'
import { withHeaders, getSingleGig } from '../../lib/api'

class GigShow extends React.Component {
  state = {
    usersLink:[],
    event: [],
    text: '',
    likes: '',
    comments: [],
    Liked: 0,
    clicked: false,
    formData:{
      text:'',
    }
  }

  async componentDidMount() {

    try {
      const eventId = this.props.match.params.id
      const res = await getSingleGig(eventId)
      this.setState({ event: res.data })
      this.setState({ comments: res.data.comments })
      this.setState({ likes: res.data.likes })
    } catch (err) {
      console.log(err)
    }

    try {
      const resuser = await axios.get(`http://localhost:3000/api/users`, withHeaders())
      this.setState({ usersLink: resuser.data})
    } catch (err) {
      console.log(err)
    }
  }

  handleClick = async event => {
    event.preventDefault()
    const eventId = this.props.match.params.id
    try {
      await createLike(this.state.text, eventId)
      const res2 = await getSingleGig(eventId)
      this.setState({ likes: res2.data.likes })
    }
    catch (err) {
      console.log(err.response.data)
    }
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData })
  }

  handleSubmit = async event => {
    const eventId = this.props.match.params.id
    try {
    const res = await createComment(this.state.formData, eventId)
    const res3 = await axios.get(`http://localhost:3000/api/events/${eventId}`)
    this.setState({ event: res3.data })
    this.setState({ comments: res3.data.comments })
  }
    catch (err) {
      console.log(err.response.data) 
    }
  }

  handleFindProfile = event => {
    const posterProps = [] 
    const poster = event.target.value 
    const selectedUser = posterProps.filter(poster)
    return selectedUser
  }

  handleDelete = async () => {
    const gigID = this.props.match.params.id
    try {
      await deleteGig(gigID)
      this.props.history.push('/gigs')
    } catch (err) {
      console.log(err.response.data)
    }
  }

  hasBarFinder = () => {
    if (this.state.event.hasBar === true){
      return "yes"
    } else {
      return "no"
    }
  }

  render() {
    return (
      <section>
        <div className="hero-gigs-indv">

          <div className="hero-gigs-indv-txt">
            <h2>Event Info</h2>
            <hr />
            <span className="gigShowArtistName">{this.state.event.artistName}</span>
            <h4><b>Venue:</b> {this.state.event.venue}</h4>
            <h4><b>Venue address:</b> {this.state.event.venueAddress}</h4>
            <h4><b>Date:</b> {this.state.event.date}</h4>
            <h4><b>Doors open at:</b> {this.state.event.doorsAt}</h4>
            <h4><b>About event:</b> {this.state.event.aboutEvent} </h4>
            <h4><b>Has Bar?:</b> {this.hasBarFinder()} </h4>
            <h4><b>Genre:</b> {this.state.event.genre} </h4>
            <h4><b>Price:</b> £{this.state.event.eventPrice}</h4>
            
           

            {isAuthenticated(this.state.event.userId) &&
            <>
            <Link to={`/gigs/${this.state.event._id}/edit`} className="button button2">Edit</Link>
            <button onClick={this.handleDelete} className="button2">Delete Event</button>
            <div>
              <button onClick={this.handleClick} value="" className="gigLike">🤍</button>
            </div>
            <p>{this.state.likes.length} people have liked this event!</p>
            </> 
            }
          </div>
          <div className="hero-gigs-indv-img">
            <img src={this.state.event.posterImage} alt="logo" className="show-page-img"/>
          </div>
        </div>

        <section className="commentEventForm">
          <div className="hero-gigs-indv-txt">
          <h2>Comments</h2>
            </div>
              <form onSubmit={this.handleSubmit}>
                <textarea
                  className="textarea commentEventForm"
                  name="text"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.formData.text}
                />
                <div>
              <input type="submit" value="Submit" className="button2"/>
            </div>
          </form>
        </section>

        <section className="gigCommentSection">
          <div>{this.state.comments.slice(0).reverse().map(eachcomment => {
          return (
            <div key={eachcomment.createdAt} className="eventComments">
            <h2 className="indivComment"><Link to={`/users/${eachcomment.user._id}`} value={eachcomment.user._id}>{eachcomment.user.username}</Link> - {eachcomment.text}</h2>
            </div>
          )})}
          </div>
        </section>
      </section>
    )
  }
}
export default GigShow



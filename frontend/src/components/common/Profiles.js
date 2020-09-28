import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { getUserId } from '../../lib/auth'
import { withHeaders } from '../../lib/api'

class Profiles extends React.Component{

  state = {
    profiles: [],
    createdEvents: []
  }

  async componentDidMount() {
    const userId = getUserId
    try {
      const res = await axios.get(`http://localhost:3000/api/profiles/${userId}`, withHeaders())
      this.setState({ profiles: res.data, createdEvents: res.data.createdEvents})
    } catch (err) {
      this.props.history.push('/notfound')
      console.log(err)
    }
  }

  render(){

    return(
      <section>
        
        <div className="hero-gigs-indv text-center">
          <div className="hero-gigs-indv-txt">
            <h2>{this.state.profiles.username}</h2>
            <h4>Welcome to your Profile Page!</h4>
          </div>
        </div>

        <div className='wrapper-crikey'>
          <div className="profile-info">
            <img className="profile-photo" src={this.state.profiles.profilePicture} alt="profpic"></img>
          <div className="profile-info">
            
            <h2>Your Name: <span>{this.state.profiles.username}</span></h2>
          </div>
          <div className="profile-info">
          
            <h2>Your e-mail: <span>{this.state.profiles.email}</span></h2>
          </div>
          <div className="profile-info">
            <h2>Your Website: <span>{this.state.profiles.mySite}</span> </h2>
          </div>
          <div className="profile-info">
            <h2>Your Favourite Genre: <span>{this.state.profiles.genres}</span></h2>
          </div>
          <div className="profile-info">
            <h2>About You: <span>{this.state.profiles.aboutMe}</span></h2>
          </div>
          </div>
          <div className="createdEventprofile">
            
          <div className="recent-activity">
            {this.state.createdEvents.map(event => {
            return <div key={event._id}>
              <p>You created: </p>
              <p>{event.artistName}</p>
              <img class="recent-activity-image" src={event.posterImage} alt="img"></img>
              <p>{event.venue}</p>
              <p>{event.date}</p>
              <Link to={`/gigs/${event._id}`}>Find out more</Link>
            </div>
            })}
            </div>
          </div>
        </div>

      </section>
    )
  }
}

export default Profiles
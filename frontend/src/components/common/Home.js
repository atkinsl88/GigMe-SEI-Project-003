import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Map from '../gigs/Maps'
import GigCalendar from '../gigs/GigCalendar'

class Home extends React.Component{

  state = {
    gigs: [],
    randomChoices: [],
    search: []
  }
  async componentDidMount() {
    try {
      const res = await axios.get('http://localhost:3000/api/events')
      this.setState({ gigs: res.data })
      this.getRandom()
    } catch (err) {
      console.log(err)
    }
  }

  getRandom = () => {
    let currentChoices = []
    for (let i = 0; i < 5; i++) {
      const random = this.state.gigs[Math.floor(Math.random() * this.state.gigs.length)]
      if(!currentChoices.includes(random) && (currentChoices.length < 3)){
      currentChoices.push(random)}
    }
    this.setState({ randomChoices: [...currentChoices] })
  }

  render() {
 

    return(
      <section>
        <div className="hero-home">
          <div className="hero-home-txt">
            <h1>Find concerts in your area</h1>
          </div>
        </div>
        <div className="featured-home">
          <div className="home-title">
            <h2>Featured Events</h2>
          </div>

          <div className="three-col">
            {this.state.randomChoices.map(name => {
              return (
                <div className="three-col-content" key={name._id}>
                  <div className="container-animation">
                    <img src={name.posterImage} alt="logo" className="image-animation"/>
                    <div className="overlay">
                      {/* <div className="text-ani">Find out more</div> */}
                      <Link to={`/gigs/${name._id}`} className="text-ani">FIND OUT MORE</Link>
                    </div>
                  </div>

                  <div>
                    <h3>{name.artistName}</h3>
                    <h4>{name.aboutEvent}</h4>
                    <h5>{name.date}</h5>
                    
                  </div>

                </div>
              )
            })}
          </div>
        </div>
        <div className="links-home">
          <div className="links-boxes">
              <a href="/gigs" className="links-boxes-lft">
                <h2>All Gigs</h2>
              </a>
              {/* <a href="/community" className="links-boxes-rgt">
                <h2>Community</h2>
              </a> */}
          </div>
        </div>
        <div className="map-home">
          
          <div className="mapArea">
            <Map className="map">
            </Map>
          </div>

          <div className="calendarArea">
            <GigCalendar className="calendar">
            </GigCalendar>
          </div>

        </div>
      </section>
    )
  }
}
export default Home
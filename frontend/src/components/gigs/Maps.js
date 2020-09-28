import React from 'react'
import axios from 'axios'
import MapGL, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import '../../../src/styles/main.scss'

import { Link } from 'react-router-dom'

class Maps extends React.Component {
  state = {
    searchResults:[],
    venues: [],
    viewport: {
      latitude: 51.5,
      longitude: -0.14,
      zoom: 11.25,
      bearing: 0,
      pitch: 0
    }
  }

  async componentDidMount() {
    try {
      const res = await axios.get('http://localhost:3000/api/events')
      this.setState({ venues: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleClick = async event => {
    event.preventDefault()
    const results = this.state.venues.filter(gig => (
      gig.venue === event.target.value
    ))
    this.setState({ searchResults: results})

  }

render() {
return (
  <div>
  <MapGL
  {...this.state.viewport}
        mapboxApiAccessToken="pk.eyJ1IjoiYWlzaGF0aG5hc2lyIiwiYSI6ImNrZHllYW51ODRodGIydHJvbm1yc2lkZHgifQ.8C_6datWjuBQUQbfsBAsOg"
        height={'600px'}
        width={'1500px'}
        onViewportChange={viewport => this.setState({viewport})} 
        mapStyle='mapbox://styles/mapbox/streets-v11'
      >
        {this.state.venues.map(venue => (
          <div key={venue._id}>
            <Marker
              value={venue.venue}
              latitude={venue.latitude}
              longitude={venue.longitude}
              >
              <span role="img" aria-label="marker" height="50" onClick = {(e) => {
              }}>📍</span>
              <button key={venue._id} className="mapLabels button" value={venue.venue} onClick={this.handleClick} >{venue.venue}</button>
            </Marker>
          </div>
        ))}
        
      </MapGL>      
    <div className="mapSearch">
      <div className="three-col">
        {this.state.searchResults.map(name => {
          return (
            <div className="map-thumbs" key={name._id}>
              
              <img src={name.posterImage} alt="logo" />
              <h3>{name.artistName}</h3>
              <Link to={`/gigs/${name._id}`} className="button">Find out more</Link>
            </div>
          )
        })}
      </div>
    </div>
  </div>
)
}
}

export default Maps
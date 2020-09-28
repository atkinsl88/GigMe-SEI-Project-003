import React from 'react'
import { getAllGigs } from '../../lib/api'
import axios from 'axios'
import GigCard from './GigCard'

class GigIndex extends React.Component {
  state = {
    events: [],
    search: []
  }

  async componentDidMount() {
    try {
      const res = await getAllGigs()
      this.setState({ events: res.data })
      this.handleAllClick()
    } catch (err) {
      console.log(err)
    }
  }

  handleClick = async event => {
    event.preventDefault()
    const results = this.state.events.filter(gig => (
      gig.genre === event.target.value
    ))
    this.setState({ search: results })
  }

  handleAllClick = async event => {
    const res = await axios.get('http://localhost:3000/api/events')
    this.setState({ search: res.data })
  }

  render() {
    return (
      <section>
        <div className="hero-gigs">
          <div className="hero-gigs-txt">
            <h1>Gigs</h1>
          </div>
        </div>

        <div id="genres" className="searchGenres">
          <button onClick={this.handleAllClick} className="search-buttons">All</button>
          <button onClick={this.handleClick} value="pop" className="search-buttons">Pop</button>
          <button onClick={this.handleClick} value="rock" className="search-buttons">Rock</button>
          <button onClick={this.handleClick} value="electronic" className="search-buttons">Electronic</button>
          <button onClick={this.handleClick} value="brunch" className="search-buttons">Brunch</button>
          <button onClick={this.handleClick} value="metal" className="search-buttons">Metal</button>
          <button onClick={this.handleClick} value="hip-hop" className="search-buttons">Hip Hop</button>
          <button onClick={this.handleClick} value="world" className="search-buttons">World</button>
          <button onClick={this.handleClick} value="ambient" className="search-buttons">Ambient</button>
          <button onClick={this.handleClick} value="country" className="search-buttons">Country</button>
          <button onClick={this.handleClick} value="grime" className="search-buttons">Grime</button>
          <button onClick={this.handleClick} value="jazz/soul" className="search-buttons">Jazz / Soul</button>
          <button onClick={this.handleClick} value="classical" className="search-buttons">Classical</button>
        </div>
        <div className="three-col">
          {this.state.search.map(name => {
            return (
              <div className="three-col-content" key={name._id}>
                <GigCard key={name._id} {...name}/>
              </div>
            )
          })}
        </div>
      </section>
    )
  }
}

export default GigIndex
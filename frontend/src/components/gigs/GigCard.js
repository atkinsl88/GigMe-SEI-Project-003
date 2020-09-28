import React from 'react'
import { Link } from 'react-router-dom'

const GigCard = ({ name, posterImage, artistName, venue, date, genre, eventPrice, _id }) => (

  <div className="column is-one-third-desktop is-one-third-tablet is-fullwidth">
    <Link to={`/gigs/${_id}`}>

      <div className="gig-card">

        <div className="card-image">
          <figure className="image image is-1by1">
            <img src={posterImage} alt={name} loading="lazy" width="300" height="220" />
          </figure>
        </div>

        <div className="card-header">
          <div className="card-header-title">
            <h4 className="">{artistName}</h4>
          </div>
          <div className="card-content">
            <h5 className="">{venue}</h5>
            <h5 className="">{date}</h5>
            <h5 className="">{genre}</h5>
            <h5 className="">£{eventPrice}</h5>
          </div>
        </div>


      </div>

    </Link>

  </div>

)

export default GigCard
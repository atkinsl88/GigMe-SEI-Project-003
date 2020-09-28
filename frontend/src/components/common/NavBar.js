import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, logout } from '../../lib/auth'
import { popupNotification } from '../../lib/notification'

class Navbar extends React.Component {

  state = {
    loggedIn: false
  }

  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen})
  }

  handleLogout = () => {
    logout()
    popupNotification('You have successfuly logged out')
    this.props.history.push('/')
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ isOpen: false })
    }
  }

  render(){
  const isLoggedIn = isAuthenticated()
  return (

      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
            Gigme
            </Link>
            <span onClick={this.handleToggle} className={`navbar-burger ${this.state.isOpen ? 'is-active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div className={`navbar-menu ${this.state.isOpen ? 'is-active' : ''}`}>
            <div className="navbar-end navbar">
              <Link to="/gigs" className="navbar-item">Gigs</Link>
              {isLoggedIn ?
                <>
                  <Link to="/create-an-event" className="navbar-item">Add a new event</Link>
                  <Link to="/profiles" className="navbar-item">Profile</Link>
                  <Link to="/" className="navbar-item" onClick={this.handleLogout}>LOG OUT</Link>
                </>
                :
                <>
                  <Link to="/register" className="navbar-item">Register</Link>
                  <Link to="/login" className="navbar-item">Log In</Link>
                </>
              }
            </div>
          </div>
        </div>
      </nav>

    )}
  }

export default withRouter(Navbar)
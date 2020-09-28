import React from 'react'

import { getSingleUser } from '../../lib/api'

class UserShow extends React.Component {

  state = {
    user: [],
  }

  async componentDidMount() {
    
    try {
      const userId = this.props.match.params.id
      const res = await getSingleUser(userId)
      this.setState({ user: res.data })
      console.log(this.state.user)
    } catch (err) {
      console.log(err)
    }
  }

  render(){
    return(
      <section className="randomUser"> 
      <img className="profile-photo" src={this.state.user.profilePicture} alt="profpic"></img>
    <div className="profile-info">
      <h2>User Name: <span>{this.state.user.username}</span></h2>
    </div>
    <div className="profile-info">
      <h2>Website: <span>{this.state.user.mySite}</span> </h2>
    </div>
    <div className="profile-info">
      <h2>Favourite Genre: <span>{this.state.user.genres}</span></h2>
    </div>
    <div className="profile-info">
      <h2>About: <span>{this.state.user.aboutMe}</span></h2>
    </div>
    </section>
    )
}
}
export default UserShow
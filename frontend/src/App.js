import React from 'react'
import { BrowserRouter, Switch , Route  } from 'react-router-dom'
import Notifications from 'react-notify-toast'

import Navbar from './components/common/NavBar'
import Home from './components/common/Home'
// import Community from './components/common/Community'
import Profiles from './components/common/Profiles'
import GigIndex from './components/gigs/GigIndex'
import GigShow from './components/gigs/GigShow'
import GigNew from './components/gigs/GigNew'
import GigEdit from './components/gigs/GigEdit'
import GigCalendar from './components/gigs/GigCalendar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Footer from './components/common/Footer'
import Maps from './components/gigs/Maps'
import UserShow from './components/gigs/UserShow'

class App extends React.Component{

render(){
  var style = 'color: red; background: #eee; font-size: 20px'
  console.log("%c made with love by the liam, noa, aishath and ash", style)

  return (
    <BrowserRouter>
      <Navbar />
      <Notifications />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/gigs/map" component={Maps}/>
        <Route exact path="/gigs/:id/edit" component={GigEdit}/>
        <Route exact path="/gigs/:id" component={GigShow}/>
        <Route exact path="/create-an-event" component={GigNew}/>
        <Route exact path="/gigs" component={GigIndex}/>
        {/* <Route exact path="/community" component={Community}/> */}
        <Route exact path="/profiles/" component={Profiles}/>
        <Route path="/register" component={Register} />
        <Route path="/gigcalendar" component={GigCalendar} />
        <Route path="/login" component={Login} />
        <Route exact path="/users/:id" component={UserShow}/>
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}
}

export default App

import React from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';


class GigCalendar extends React.Component {

  state = {
    events: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]

  }

  async componentDidMount() {
    try {
      const res = await axios.get('http://localhost:3000/api/events')
      this.setState({ events: res.data })
    } catch (err) {
      console.log(err)
    }
  }


  render(){
  //! Yes... I did try map 
    const events = [
      { title: this.state.events[0].artistName, date: new Date(this.state.events[0].date)},
      { title: this.state.events[1].artistName, date: new Date(this.state.events[1].date)},
      { title: this.state.events[2].artistName, date: new Date(this.state.events[2].date)},
      { title: this.state.events[3].artistName, date: new Date(this.state.events[3].date)},
      { title: this.state.events[4].artistName, date: new Date(this.state.events[4].date)},
      { title: this.state.events[5].artistName, date: new Date(this.state.events[5].date)},
      { title: this.state.events[6].artistName, date: new Date(this.state.events[6].date)},
      { title: this.state.events[7].artistName, date: new Date(this.state.events[7].date)},
      { title: this.state.events[8].artistName, date: new Date(this.state.events[8].date)},
      { title: this.state.events[9].artistName, date: new Date(this.state.events[9].date)},
      { title: this.state.events[10].artistName, date: new Date(this.state.events[10].date)},
      { title: this.state.events[11].artistName, date: new Date(this.state.events[11].date)},
      { title: this.state.events[12].artistName, date: new Date(this.state.events[12].date)},
      { title: this.state.events[13].artistName, date: new Date(this.state.events[13].date)},
      { title: this.state.events[14].artistName, date: new Date(this.state.events[14].date)},
      { title: this.state.events[15].artistName, date: new Date(this.state.events[15].date)},
      { title: this.state.events[16].artistName, date: new Date(this.state.events[16].date)},
      { title: this.state.events[17].artistName, date: new Date(this.state.events[17].date)},
      { title: this.state.events[18].artistName, date: new Date(this.state.events[18].date)},
      { title: this.state.events[19].artistName, date: new Date(this.state.events[19].date)},
      { title: this.state.events[20].artistName, date: new Date(this.state.events[20].date)},
      { title: this.state.events[21].artistName, date: new Date(this.state.events[21].date)},
      { title: this.state.events[22].artistName, date: new Date(this.state.events[22].date)},
      { title: this.state.events[23].artistName, date: new Date(this.state.events[23].date)},
      { title: this.state.events[24].artistName, date: new Date(this.state.events[24].date)},
      { title: this.state.events[25].artistName, date: new Date(this.state.events[25].date)},
      { title: this.state.events[26].artistName, date: new Date(this.state.events[26].date)},
      { title: this.state.events[27].artistName, date: new Date(this.state.events[27].date)},
      { title: this.state.events[28].artistName, date: new Date(this.state.events[28].date)},
      { title: this.state.events[29].artistName, date: new Date(this.state.events[29].date)},
      { title: this.state.events[30].artistName, date: new Date(this.state.events[30].date)},
      { title: this.state.events[31].artistName, date: new Date(this.state.events[31].date)},
      { title: this.state.events[32].artistName, date: new Date(this.state.events[32].date)},
    ];

    if (!this.state.events) return null
    return (
      <div className="App">
        <FullCalendar
          plugins={[dayGridPlugin]}
          events={events}
          aspectRatio={'2.5'}
        />
      </div>
    )
  }
}

export default GigCalendar
import React, { Component } from 'react';
import './App.css';
import {Map, MapMarker} from './Map.js';
import { Sidebar } from './Sidebar.js'

const CLIENT_ID = "0JDWPB1NCC32MBSESDDVVHE1SDYDAQ551EPO0HQGU5FPO10T";
const CLIENT_SECRET = "E5X4B0KWBOBEC5KR1IJHSG1JXRHB5FKSE5HV0WIIKAZEQ32U";

class App extends Component {
  state = {
    locations : [
      {
        position : {lat: 40.77972902126812, lng: -73.96341562271118},
      },
      {
        position : {lat: 40.776113, lng: -73.975213},

      },
    ]
  }

  async componentDidMount () {
    const locations = await Promise.all(this.state.locations.map((loc) => this.fetchEntry(loc)))
    console.log(locations)
    this.setState({locations})
  

}

 fetchEntry = async  (entry) => {
  const {position : {lat, lng }} = entry
  const response =  await fetch(`https://api.foursquare.com/v2/venues/explore?cat=food&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20180323&limit=1&ll=${lat},${lng}`)
  const {response : {groups : [{items : [{venue : {categories, name, hereNow : {summary}}}]}]}} = await response.json()
  return {...entry, name, summary, categories : categories.map( c => c.name )}

}
    
  

  

  render() {
    
    return (
      <div className="App">
        < Sidebar locations={this.state.locations}/> 
        < Map>
        {this.state.locations.map((loc) => <MapMarker position={loc.position } title={loc.name} key={loc.name}>
        <p>{loc.name}</p>
        <p>{(loc.categories || [] ).join(", ")}</p>
        <p>{loc.summary}</p>
        </ MapMarker> )}
        
        </Map>
      </div>
    );
  }
}

export default App;

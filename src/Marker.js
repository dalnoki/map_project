import React, { Component } from 'react';

const google = window.google;

  class Marker extends Component {

    
    componentDidMount() {
   

      this.marker = new google.maps.Marker( (this.refs.marker, {
        position:  { lat: 40.7446790, lng: -73.9485420 },
        title: 'Uluru (Ayers Rock)'
      }))
    }
   
    
    render() {
   
      
      return (
        <div>
          <div ref="marker">
          </div>
        </div>
      );
    }
  }
  
export default Marker;

  
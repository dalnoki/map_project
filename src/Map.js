import React, { Component } from 'react';

const google = window.google;

const MapContext = React.createContext(null);

  
 export  class Map extends Component {
    state = {map : null}

    
    componentDidMount() {

      let map = new google.maps.Map(this.refs.map, {
        center: { lat: 40.776494, lng: -73.968541},
        zoom: 16
      });

       this.setState({map})
      
      
    }
   
    
    render() {
      return (
        <div>
          <div ref="map" id="map" role="application">
          </div>
          <MapContext.Provider value={this.state.map}>
            {this.props.children}
          </MapContext.Provider>
        </div>
      );
    }
  }
  
class Marker extends Component {
        
  componentDidMount() {
    if (!this.marker) {
        this.marker = new google.maps.Marker({
        ...this.props
        });

         this.infowindow = new google.maps.InfoWindow({
          content: this.refs.popup,
        });
    
        this.marker.addListener('click', () => {
          this.infowindow.open(this.props.map, this.marker);
        });
      }
        this.marker.setMap(this.props.map)

        if (this.props.bounce) {
          this.marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }

      


  componentWillUnmount() {
        this.marker.setMap(null) 
  
    
  }

  componentDidUpdate() {
    this.marker.setMap(this.props.map)

    if (this.props.bounce) {
      this.marker.setAnimation(google.maps.Animation.BOUNCE);
      this.infowindow.open(this.props.map, this.marker)
    } else {
      this.marker.setAnimation(null);
      this.infowindow.close()
    }

  }



   
    
  render() {return (<div ref="popup">{this.props.children}</div>) }

  }
   
export const MapMarker = (props) => (<MapContext.Consumer>
  {(map) => (map && <Marker map={map} {...props}/>) }
  
  
  </MapContext.Consumer>)
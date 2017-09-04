import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Map, InfoWindow, Marker, Polygon, GoogleApiWrapper} from 'google-maps-react';
import history from '../history';

import { poiClusters } from '../Config/sampleMapClusters';
import { googlemaps, auth0 } from '../Config/params';
// import params from '../Config/params';


// console.log(params);
const map_key = googlemaps.key;
const POIClustersData = poiClusters;
export class MapContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = { width: '0', height: '0' };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.mapMarkers = this.parseMarkers();

    this.state.selectedCluster = 0;
    this.polygons = poiClusters;
    this.initialRegion = {
            lat: 39.143828,
            lng: -94.573043
          };
  }

  componentWillMount() {

    }
  val2key(val,array){
    for (var key in array) {
      let this_val = array[key];
      if(this_val.key == val){
          return key;
          break;
      }
    }
  }

  parseMarkers()
  {
    let markers = [];
    for (var i = POIClustersData.length - 1; i >= 0; i--) {
      for (var j = POIClustersData[i].pois.length - 1; j >= 0; j--) {
        markers.push(POIClustersData[i].pois[j]);
      }
    }
    return markers;
  }
    /**
   * check if input latlong is inside any of the polygons
   * if yes return that polygon
   * else return false
   */
  pointInPloygons(point) 
  {
    var tmpFlag = false;
    for (var i = POIClustersData.length - 1; i >= 0; i--) {
      tmpFlag = this.pointInPoly(point, POIClustersData[i].polygonOverlay.coordinates);
      if(tmpFlag)
      {
        break;
      }
    }
    if(tmpFlag)
    {
      return POIClustersData[i];
    }
    else
    {
      return tmpFlag;
    }
  }

    /**
   * Check if point(latlong object) is inside polygon
   * Returns boolean true or false
   */
  pointInPoly(point, polygon) {
      // ray-casting algorithm based on
      // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
      
      var x = point.latitude, y = point.longitude;
      
      var inside = false;
      for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
          var xi = polygon[i].latitude, yi = polygon[i].longitude;
          var xj = polygon[j].latitude, yj = polygon[j].longitude;
          
          var intersect = ((yi > y) != (yj > y))
              && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
          if (intersect) inside = !inside;
      }
      
      return inside;
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  onMarkerClick(e, venue_key)
  {
    // alert(venue_key);
    console.log(this.props);
    // this.props.params = {currentVenueId: venue_key};
    history.replace('/venue',{venue_key:venue_key});
  }

  onMapClicked(e)
  {
    console.log(e);
    // alert("Map clicked");
  }

  render() {
    return (
      <Map 
        google={this.props.google} 
        zoom={17}
        style={style}
        initialCenter={this.initialRegion}
        onClick={e => this.onMapClicked(e)}
        visible={true}
      >



      {
        this.mapMarkers.map(marker => (
          <Marker
            key={marker.venueID}
            position={marker.latlng}
            name={marker.title}
            onClick={e => this.onMarkerClick(e, marker.venueID)}
            icon={{
              url: marker.markerImage,
              width: 20,
              height:20
            }}
          >
            
          </Marker>
          )
        )
      }
      {
        this.polygons.map(polygon => (
          <Polygon
            key={polygon.polygon.key}
            paths={polygon.polygonOverlay.coordinates}
            strokeColor="#00FFFF"
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor="#00FFFF"
            fillOpacity={0.35}
          />
          )
        )
      }


      </Map>

      );
  }
}

const style = {
  width: '100%',
  height: '100%'
}

export default GoogleApiWrapper({
  apiKey: (map_key)
})(MapContainer)
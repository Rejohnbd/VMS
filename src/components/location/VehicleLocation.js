import React, { Fragment } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import firebase from 'firebase';
import MyMarker from './MyMarker';
import * as geolib from 'geolib';
// Redux
// import { connect } from 'react-redux';


const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoicmVqb2huIiwiYSI6ImNqeXNqenl6NTBtcmUzbnNlN2swYXhvb2IifQ.4GjRx2WVIwGy8yLaKBTXmg'
});

function dex_to_degrees (dex) {
  return parseInt(dex, 16) / 1800000;
};

function convertData (data) {
    // console.log(data)
    let lat = dex_to_degrees(data.lat);
    let lng = dex_to_degrees(data.lng);
    let speed = dex_to_degrees(data.speed)*1800000;
    let status = data.status;
    let newData = {
      lat: lat,
      lng: lng,
      speed: speed,
      status: status
    }

    return newData
}

class VehicleLocation extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
        data: convertData(this.props.device.data),
        initialData: convertData(this.props.device.data),
        rotation: 0
      }
  }

  changeState = (currntData,rotation) => {
    this.setState({data: currntData,rotation:rotation})
  }

  animate = (data, newData, currentState) => {
    
    let step = 30;
    let deltaLat = (newData.lat - data.lat)/step;
    let deltaLng = (newData.lng - data.lng)/step;
    let cdata = data;

    let rotation = geolib.getGreatCircleBearing(
      {latitude: data.lat, longitude: data.lng},
      {latitude: newData.lat, longitude: newData.lng}
    )
    
    function anim (){
      let newLat = cdata.lat + deltaLat;
      let newLng = cdata.lng + deltaLng;
      
      cdata.lat = newLat;
      cdata.lng = newLng;
     
      if(step > 0){
        requestAnimationFrame(anim)
        step --;
      }
    
      currentState(cdata,rotation)
    }
    requestAnimationFrame(anim)
  }
  

    componentDidMount(){
      let database = firebase.database();
      let deviceRef = database.ref().child('devices').child(this.props.device.id)
      
      deviceRef.on('child_added', data => {
        if(data.key ==='data'){
          let newData = convertData(data.val())
          this.setState({data: newData})
        }        
      })      

      deviceRef.on('child_changed', data => {
        if(data.key ==='data'){
          let newData = convertData(data.val())
          this.animate(this.state.data, newData,this.changeState)
        }           
      })
    }

    render() { 
      
        return (
            <Fragment>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    {/* <h1 className="h3 mb-0 text-gray-800">Vehicle Location</h1> */}
                </div>
                <div className="card shadow mb-4" >
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-center text-primary">VEHICLE LOCATION IN MAP</h6>
                    </div>
                    <div id="map" className="card-body" style={{height:'600px'}}>
                      <Map
                        center={[this.state.initialData.lng, this.state.initialData.lat]}
                        zoom={[16]}
                        style="mapbox://styles/mapbox/streets-v9"
                        containerStyle={{
                          height: '100%',
                          width: '100%'
                        }}
                      >
                        
                        <MyMarker data={this.state.data} rotation={this.state.rotation} />
                        
                        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                          <Feature coordinates={[ this.state.initialData.lng, this.state.initialData.lat]} />
                        </Layer>
                      </Map>
                    </div>
                </div>
            </Fragment>
        );
    }
}
 
export default VehicleLocation;
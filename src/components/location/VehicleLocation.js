import React, {Component, Fragment} from 'react';
import firebase from 'firebase';
import mapboxgl from 'mapbox-gl';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import MyMarker from './MyMarker';

const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1IjoicmVqb2huIiwiYSI6ImNqeXNqenl6NTBtcmUzbnNlN2swYXhvb2IifQ.4GjRx2WVIwGy8yLaKBTXmg'
});

function dex_to_degrees (dex) {
    return parseInt(dex, 16) / 1800000;
};

function convertData (data) {
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


class VehicleLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: convertData(this.props.vehicle.data),
            initialData: convertData(this.props.vehicle.data),
            rotation: 0
        }
    }

    componentDidMount(){
        let database = firebase.database();
        let deviceRef = database.ref().child('devices').child(this.props.vehicle.id)
        
        deviceRef.on('child_added', data => {
          if(data.key ==='data'){
            console.log(data.val())
            let newData = convertData(data.val())
            this.setState({data: newData})
          }        
        })      
  
        deviceRef.on('child_changed', data => {
          if(data.key ==='data'){
            let newData = convertData(data.val())
            this.setState({data: newData})
            this.animate(this.state.data, newData,this.changeState)
          }        
        })
    }

    render() { 
        return (
            <Fragment>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Vehicle Location</h1>
                    <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                        <i className="fas fa-download fa-sm text-white-50"></i> Back To Vechicle List
                    </button>
                </div>
                <div className="card shadow mb-4" >
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-center text-primary">Vehicle Location</h6>
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
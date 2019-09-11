import React from 'react';
import { Marker } from 'react-mapbox-gl';
import activeCar from '../../images/active-car.png';
// Redux
// import { connect } from 'react-redux';



const MyMarker = (props) => {
    const markerRotate = {
        transform: `rotate(${props.rotation}deg)`
    }
   
  
    return (
        <Marker
            coordinates={[ props.data.lng, props.data.lat]}
            anchor="center">
            <img src={activeCar} style={markerRotate} width="50px" height="50px" alt="Location Car"/>
        </Marker>
    );
}
 
export default MyMarker;
import React from 'react';
import { Marker } from 'react-mapbox-gl';
import activeCar from '../../images/active-car.png';

const MyMarker = (props) => {
    return (
        <Marker
            coordinates={[props.data.lng, props.data.lat]}
            anchor="center"
        >
            <img src={activeCar} width="50px"  height="50px" />
        </Marker>
    );
}
 
export default MyMarker;
import React, { Fragment } from 'react';
import Modal from 'react-modal';
import mapboxgl from 'mapbox-gl';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import MyMarker from './MyMarker';
import ReactTooltip  from 'react-tooltip';
// Redux
// import { connect } from 'react-redux';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoicmVqb2huIiwiYSI6ImNqeXNqenl6NTBtcmUzbnNlN2swYXhvb2IifQ.4GjRx2WVIwGy8yLaKBTXmg'
});

const VehicleLocationModal =(props) => {
    return (
        <Modal
            isOpen={props.showModal}
            onRequestClose={props.closeModal}
            className="Modal"
            overlayClassName="Overlay"
            ariaHideApp={false}
            contentLabel="Example Modal" >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Vehicle Location</h5>
                        <button onClick={props.modalClose} type="button" className="close" data-tip="Close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                        <ReactTooltip />
                    </div>
                    <div className="modal-body" style={{height: '500px'}}>
                      <Map
                        center={[props.device.lng, props.device.lat]}
                        zoom={[16]}
                        style="mapbox://styles/mapbox/streets-v9"
                        containerStyle={{
                          height: '100%',
                          width: '100%'
                        }}
                      >
                      <MyMarker data={props.data} rotation={props.rotation} />
                      <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                        <Feature coordinates={[ props.device.lng, props.device.lat ]} />
                      </Layer>
                    </Map>
                    </div>
                    <div className="modal-footer">
                        <button onClick={props.modalClose} type="button" className="btn btn-block btn-danger btn-sm" data-dismiss="modal">Close</button>
                    </div>
                </div>
        </Modal>
    );
}
 
export default VehicleLocationModal;
function dex_to_degrees (dex) {
    return parseInt(dex, 16) / 1800000;
};
  
export const convertData = (data) => {
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

export const checkAssignedDevice = (devices) => {
    let assignedDevices = [];
    devices.map(device => {
        if(device.uid !== null){
            assignedDevices.push(device);
        }
    })
    return assignedDevices;
}

export const checkUnassignedDevice = (devices) => {
    let unassignedDevices = [];
    devices.map(device => {
        if(device.uid === null){
            unassignedDevices.push(device);
        }
    })
    return unassignedDevices;
}

export const formatedDeviceDataForDeviceList = (devices) => {
    let allDevice = [];
    devices.map(device => {
        let vehicleType;
        switch(device.vehicle_type) {
            case 1: 
                vehicleType = "MOTOR CYCLE";
                break;
            case 2: 
                vehicleType = "CAR";
                break;
            case 3: 
                vehicleType = "TRUCK";
                break;
            case 4: 
                vehicleType = "BUS";
                break;
            case 5: 
                vehicleType = "OTHERS";
                break;
            default:
                vehicleType = "";
                break;
        }
        let formatDevice = {
            _id: device._id,
            uid: device.uid,
            imei: device.imei,
            registration_number: device.registration_number,
            center_number: device.center_number,
            is_inactive: device.uid ? 'Assigned' : 'Unassigned',
            device_model: device.device_model,
            device_sim_number: device.device_sim_number,
            driver_name: device.driver_name,
            driver_phone: device.driver_phone,
            driver_photo: device.driver_photo,                
            vehicle_type: vehicleType,
            mileage: device.mileage
        }
        allDevice.push(formatDevice)
    })
    return allDevice;
}
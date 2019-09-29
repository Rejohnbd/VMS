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
import React, { useRef } from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';


const containerStyle = {
  width: '1300px',
  height: '700px'
};


var center = {     //cenetr of poland lodz
  lat: 51.759048,
  lng: 19.458599
};


export const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCC9T95yfw2zAwTleyYAGMqCSAVnZDkttQ"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    // var point = new window.google.maps.LatLng(51.759048, 19.458599);
    // map.setCenter(point);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const prevMarkersRef = useRef([]);
  clearMarkers(prevMarkersRef.current); //clear prev markers


  function createMarker(position, map) {
    return new window.google.maps.Marker({
      icon :"https://icons.iconarchive.com/icons/google/noto-emoji-animals-nature/32/22215-dog-icon.png",
      position: position,
      map: map,
       
    });
  }
  
  clearMarkers(prevMarkersRef.current);

  
  function clearMarkers(markers) {
    for (let m of markers) {
      m.setMap(null);
    }
  }

  return isLoaded ? (
      <GoogleMap  onClick={ev => {
        const m = createMarker({ lat: ev.latLng.lat(), lng: ev.latLng.lng() }, map);
        clearMarkers(prevMarkersRef.current); //clear prev markers
        console.log("Pan Pieseł ostatnio był widziany w lokalizacji (szerokość i długość geograficzna)");
        console.log(ev.latLng.lat());
        console.log(ev.latLng.lng());
        prevMarkersRef.current.push(m);
       }} 

        mapContainerStyle={containerStyle}
        center={center}
        zoom={6}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
       {/* <></> */}
      </GoogleMap>
  ) : <></>
}

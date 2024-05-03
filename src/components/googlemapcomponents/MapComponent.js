import React, { useState, useEffect } from 'react';
import './../Body.css';
import { landingPageCardData } from '../../mockdata/landingPageCard';

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  
  // Initialize the map when component mounts
  useEffect(() => {
    const loadMap = () => {
      const google = window.google;
      const mapElement = document.getElementById('map');
      const mapInstance = new google.maps.Map(mapElement, {
        center: { lat: 19.076090, lng: 72.877426 },
        zoom: 4,
        scrollwheel: true,
        // mapTypeId: 'satellite'
      });
      setMap(mapInstance);
    };
    
    // Load the Google Maps API script dynamically
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAJdT5wT2CTZwpEnBB6fA_ePZav68WU3lg&libraries=places`;
    script.async = true;
    script.onload = loadMap;
    document.body.appendChild(script);

    // Clean up function to remove the script
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Add markers to the map when the map is ready
  useEffect(() => {
    if (map) {
      const google = window.google;
      // const markerData = [
      //   { lat: 19.076090, lng: 72.877426, city: 'Mumbai', data: 'Data for New York' },
      //   { lat: 34.0522, lng: 118.2437, city: 'Los Angeles', data: 'Data for Los Angeles' },
      // ];

      const markerData = landingPageCardData;

      const markerList = markerData.map(marker => {
        const markerInstance = new google.maps.Marker({
          position: { lat: marker.lat, lng: marker.lng },
          map: map,
          title: marker.city,
          data: marker.data,
        });

        // Add event listener for showing data on hover
        const infoWindow = new google.maps.InfoWindow({
          content: markerInstance.data,
        });
        markerInstance.addListener('mouseover', () => {
          infoWindow.open(map, markerInstance);
        });

        markerInstance.addListener('mouseout', () => {
          infoWindow.close();
        });

        return markerInstance;
      });

      // Set markers state
      setMarkers(markerList);
    }
  }, [map]);

  window.onload = function() {
    var div = document.getElementById('map');
    div.style.transform = 'scale(1.4)';
  };

  return <div id="map" className="map-container"></div>;
};

export default MapComponent;

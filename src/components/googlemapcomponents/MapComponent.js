import React, { useState, useEffect } from 'react';
import './../Body.css';
import { landingPageCardData } from '../../mockdata/landingPageCard';
import { mapsApiKey } from '../../constants';

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  
  useEffect(() => {
    const loadMap = () => {
      const google = window.google;
      const mapElement = document.getElementById('map');
      const mapInstance = new google.maps.Map(mapElement, {
        center: { lat: 19.076090, lng: 72.877426 },
        zoom: 4,
        scrollwheel: true,
      });
      setMap(mapInstance);
    };
    
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&libraries=places`;
    script.async = true;
    script.onload = loadMap;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (map) {
      const google = window.google;
      const markerData = landingPageCardData;

      const markerList = markerData.map(marker => {
        const markerInstance = new google.maps.Marker({
          position: { lat: marker.lat, lng: marker.lng },
          map: map,
          title: marker.city,
          data: `Forecast Value: ${marker.forecastValue/1000} M`,
        });

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
      setMarkers(markerList);
    }
  }, [map]);

  window.onload = function() {
    var div = document.getElementById('map');
    div.style.transform = 'scale(1.6)';
  };

  return <div id="map" className="map-container"></div>;
};

export default MapComponent;

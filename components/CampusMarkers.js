import { useEffect } from 'react';
import { campusData } from './Campus_content';

const CampusMarkers = ({ setCampusMarkers }) => {

  useEffect(() => {
      const markers = campusData.map((campus) => ({
        title: campus.h2,
        description: campus.p,
        latitude: campus.lat,
        longitude: campus.lng,
        img: campus.src,
        subtitle: campus.h3,
      }));

      setCampusMarkers(markers);
    },[setCampusMarkers]
  ); 
  return null;
};

export default CampusMarkers;

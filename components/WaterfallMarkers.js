import { useEffect } from 'react';
import { waterfalls } from './City_Waterfalls';

const WaterfallMarkers = ({
  community,
  deltas = { latitudeDelta: 0.09, longitudeDelta: 0.09 },
  setRegion,
  setCustomMarkers,
  setSelectedCommunity,
}) => {
  useEffect(() => {
    if (!community) return;

    const filtered = waterfalls.filter(
      (waterfall) => waterfall.properties.COMMUNITY === community
    );

    if (filtered.length === 0) return;

    const markers = filtered.map((waterfall) => {
      const title = waterfall.properties.NAME;
      const type = waterfall.properties.TYPE;
      const latitude = waterfall.geometry.coordinates[1];
      const longitude = waterfall.geometry.coordinates[0];
      const height = waterfall.properties.HEIGHT_IN_M;
      const width = waterfall.properties.WIDTH_IN_M;
      const cluster_area = waterfall.properties.CLUSTER_AREA;
      const ranking = waterfall.properties.RANKING;
      const ownership = waterfall.properties.OWNERSHIP;
      const access_from = waterfall.properties.ACCESS_FROM;
      const community = waterfall.properties.COMMUNITY;

      return {
        title,
        description: `Located in the beautiful community of ${community}, ${title} is a picturesque ${type} within the ${cluster_area} cluster area. Standing at a height of ${height} meters and a width of ${width} meters, this waterfall is one of the many beautiful waterfalls this community holds. Ranked as a ${ranking}-level waterfall, ${title} is publicly accessible (${ownership} ownership) and can be reached via ${access_from}. Whether you're exploring the natural beauty of the area or just passing by, this cascade is a delightful spot to visit.`,
        latitude,
        longitude,
        height,
        width,
        cluster_area,
        ranking,
        ownership,
        access_from,
        community,
      };
    });

    if (filtered.length > 1) {
      const middleWaterfall = Math.round(filtered.length / 2);
      regionCoord = filtered[middleWaterfall].geometry.coordinates;
    } else {
      regionCoord = filtered[0].geometry.coordinates;
    }

    setRegion({
      latitude: regionCoord[1],
      longitude: regionCoord[0],
      latitudeDelta: deltas.latitudeDelta,
      longitudeDelta: deltas.longitudeDelta,
    });

    setCustomMarkers(markers);
    setSelectedCommunity(community);
  }, [
    community,
    deltas.latitudeDelta,
    deltas.longitudeDelta,
    setRegion,
    setCustomMarkers,
    setSelectedCommunity,
  ]);

  return null;
};

export default WaterfallMarkers;

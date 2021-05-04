import React, { useEffect, useState } from "react";
import { MapContainer, ZoomControl } from "react-leaflet";
import { useSelector } from "react-redux";

import TileMap from "./mapParts/TileMap";
import Countries from "./mapParts/CountrieMap";
import Cities from "./mapParts/CitiesMap";
import DrawFeatures from "./mapParts/DrawFeatures";

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const position = [59.9311, 30.3609];

  const zoomObject = useSelector((state) => state.zoom);

  useEffect(() => {
    if (zoomObject.geometry) {
      if (!zoomObject.geometry.coordinates[0].length) {
        map.flyTo([zoomObject.geometry.coordinates[1], zoomObject.geometry.coordinates[0]], 10);
      } else {
        let array = [];
        let x = 0;
        let y = 0;
        if (zoomObject.geometry.coordinates.length === 1) {
          array = zoomObject.geometry.coordinates[0];
        } else {
          for (let i = 0; i < zoomObject.geometry.coordinates.length; i++) {
            array = [...array, ...zoomObject.geometry.coordinates[i][0]];
          }
        }
        for (let i = 0; i < array.length; i++) {
          x += array[i][0];
          y += array[i][1];
        }
        x = x / array.length;
        y = y / array.length;
        map.flyTo([y, x], 5);
      }
    }
  }, [zoomObject, map]);
  return (
    <MapContainer
      whenCreated={(mapInst) => setMap(mapInst)}
      center={position}
      zoom={5}
      scrollWheelZoom={true}
      className="w-100"
      zoomControl={false}
      dragging={true}
      style={{ height: "95vh", width: "90% !important" }}
    >
      <TileMap />
      <Countries />
      <Cities />
      <ZoomControl position="topright" className="zoomButton" />
      <DrawFeatures map={map} />
    </MapContainer>
  );
};

export default MapComponent;

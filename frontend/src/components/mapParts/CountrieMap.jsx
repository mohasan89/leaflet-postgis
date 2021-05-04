import React, { useEffect, useRef } from "react";
import { GeoJSON } from "react-leaflet";

import { useSelector } from "react-redux";

const TileLayerBase = () => {
  const mapLayer = useRef();
  const { vis, values, orginal_values } = useSelector((state) => state.countries);
  const style = useSelector((state) => state.style.countries);
  useEffect(() => {
    if (mapLayer.current) {
      mapLayer.current.setStyle(style);
      mapLayer.current.bringToBack();
    }
  }, [vis, style, orginal_values]);

  useEffect(() => {
    if (mapLayer.current) {
      if (
        Object.keys(mapLayer.current._layers).length !== orginal_values.length ||
        values.length !== orginal_values.length
      ) {
        mapLayer.current.clearLayers();
        mapLayer.current.addData(values);
      }
    }
  }, [values, orginal_values]);

  return vis && values ? (
    <GeoJSON key="cities" data={values} ref={mapLayer} style={{ ...style, zIndex: 501 }} />
  ) : null;
};

export default TileLayerBase;

import React, { useEffect, useRef } from "react";
import { GeoJSON } from "react-leaflet";

import { useSelector } from "react-redux";
import L from "leaflet";

const CityLayer = () => {
  const cityLayer = useRef();
  const { vis, values, orginal_values } = useSelector((state) => state.cities);

  const style = useSelector((state) => state.style.cities);

  const marker = (feature, latlng) => {
    return L.circleMarker(latlng, style);
  };

  const popupBinder = (feature, layer) => {
    const { name, country, population, capital } = feature.properties;
    layer.bindPopup(
      `<div>
        <div class='d-flex justify-content-between' style='min-width: 150px;'><p class='m-0'>Name:</p>
              <p class='m-0'><strong>${name}</strong></p>
        </div>
        <div class='d-flex justify-content-between'><p class='m-0'>Population:</p>
              <p class='m-0'><strong>${population}</strong></p>
        </div>
        <div class='d-flex justify-content-between'><p class='m-0'>Country:</p>
              <p class='m-0'><strong>${country}</strong></p>
        </div>
        <div class='d-flex justify-content-between'><p class='m-0'>Administrative city:</p>
              <p class='m-0'><strong>${capital ? true : false}</strong></p>
        </div>
      </div>`,
      {
        offset: L.point(0, 12),
      }
    );
  };

  useEffect(() => {
    if (cityLayer.current) {
      cityLayer.current.setStyle(style);
      cityLayer.current.bringToFront();
    }
  }, [vis, style, orginal_values]);

  useEffect(() => {
    if (cityLayer.current) {
      if (
        Object.keys(cityLayer.current._layers).length !== orginal_values.length ||
        values.length !== orginal_values.length
      ) {
        cityLayer.current.clearLayers();
        cityLayer.current.addData(values);
      }
    }
  }, [values, orginal_values]);

  return vis && values ? (
    <GeoJSON
      key="cities"
      data={values}
      ref={cityLayer}
      pointToLayer={marker}
      onEachFeature={popupBinder}
    />
  ) : null;
};

export default CityLayer;

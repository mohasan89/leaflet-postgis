import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import axios from "axios";

import L from "leaflet";
import "leaflet-draw";

const DrawFeaturesButton = ({ map }) => {
  const { show } = useSelector((state) => state.edit);
  const [controller, setController] = useState(null);

  const [dataFetched, setData] = useState(null);

  const [editableLayers] = useState(new L.FeatureGroup());

  //marker
  const marker = L.Icon.extend({
    options: {
      shadowUrl: null,
      iconAnchor: new L.Point(12, 12),
      iconSize: new L.Point(24, 35),
      iconUrl: "marker.png",
    },
  });

  const icon = new L.Icon({
    shadowUrl: null,
    iconAnchor: new L.Point(12, 12),
    iconSize: new L.Point(24, 35),
    iconUrl: "marker.png",
  });

  const options = {
    position: "topright",
    draw: {
      polygon: {
        shapeOptions: {
          color: "#606060",
          fillOpacity: 0.6,
          weight: 4,
          opacity: 1,
        },
      },

      circle: false,

      rectangle: false,

      marker: {
        icon: new marker(),
      },

      polyline: {
        shapeOptions: {
          color: "#606060",
          fillOpacity: 0.6,
          weight: 4,
          opacity: 1,
        },
      },
    },
    edit: {
      featureGroup: editableLayers,
      remove: true,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/userdata");
      setData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (dataFetched && editableLayers) {
      dataFetched.forEach((item) => {
        if (item.geom.type === "Point") {
          const feature = L.marker(item.geom.coordinates, { icon: icon });
          feature.properties = { geometry: feature.toGeoJSON() };
          feature.addTo(editableLayers);
          return;
        }

        const feature = new L.GeoJSON.geometryToLayer(item.geom);
        feature.setStyle(options.draw.polygon.shapeOptions);
        feature.properties = { geometry: feature.toGeoJSON() };
        editableLayers.addLayer(feature);
      });
    }
    // eslint-disable-next-line
  }, [dataFetched]);

  useEffect(() => {
    if (controller) {
      controller.remove();
    }
    if (!show && map) {
      map.removeLayer(editableLayers);
    }
    if (map && show) {
      map.addLayer(editableLayers);

      const drawControl = new L.Control.Draw(options);

      map.addControl(drawControl);

      map.on(L.Draw.Event.CREATED, function (e) {
        const layer = e.layer;
        layer.properties = { geometry: layer.toGeoJSON() };

        editableLayers.addLayer(layer);

        try {
          axios.post("/api/userdata", layer.toGeoJSON());
        } catch (error) {
          window.alert("error when writing to database");
        }
      });

      map.on("draw:deleted", (e) => {
        const layers = e.layers;
        layers.eachLayer((layer) => {
          try {
            axios.delete("/api/userdata", { data: layer.toGeoJSON() });
          } catch (error) {
            window.alert("error when writing to database");
          }
        });
      });

      map.on("draw:edited", (e) => {
        const layers = e.layers;
        layers.eachLayer((layer) => {
          try {
            console.log(layer.properties);
            axios.put("/api/userdata", {
              geometry: layer.properties.geometry.geometry,
              geometry_update: layer.toGeoJSON().geometry,
            });
          } catch (error) {
            window.alert("error when writing to database");
          }
        });
      });

      setController(drawControl);
    }
    // eslint-disable-next-line
  }, [map, show]);
  return <></>;
};

export default DrawFeaturesButton;

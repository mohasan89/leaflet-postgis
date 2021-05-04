import React, { useEffect, useRef } from "react";
import { TileLayer } from "react-leaflet";

import { useSelector } from "react-redux";

const TileLayerBase = () => {
  const tileMap = useRef();
  const { vis, url } = useSelector((state) => state.basemap);
  useEffect(() => {
    tileMap.current.setUrl(url);
  }, [url]);
  return vis ? <TileLayer url={url} ref={tileMap} /> : null;
};

export default TileLayerBase;

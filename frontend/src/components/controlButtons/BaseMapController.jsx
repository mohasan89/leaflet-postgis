import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { FormGroup, FormLabel, FormControl, FormCheck } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

import { changeVisBaseMap, changeBaseMap } from "../../store/actions/geodataActions";
const BaseMapController = () => {
  const dispatch = useDispatch();
  const [checkbox, setCheckbox] = useState(true);
  const [basemap, setBasemap] = useState("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");

  const FormControlHandler = (e) => {
    setBasemap(e.target.value);
    dispatch(changeBaseMap(e.target.value));
  };

  const checkboxHandler = (e) => {
    setCheckbox(!checkbox);
    dispatch(changeVisBaseMap());
  };
  return (
    <FormGroup>
      <Row className="px-3">
        <Col>
          <FormCheck className="d-inline mr-3 ml-1" checked={checkbox} onChange={checkboxHandler} />
          <FormLabel className="text-white"> Basemap</FormLabel>
        </Col>
        <Col lg={7} xs={8}>
          <FormControl
            as="select"
            onChange={FormControlHandler}
            value={basemap}
            className="d-block d-md-inline w-md-50"
          >
            <option value="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">OSM</option>
            <option value="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png">OSM Topo map</option>
            <option value="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png">
              OSM Gray
            </option>
            <option value="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png">
              CartoDB Dark
            </option>
            <option value="https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}">
              Esri Terrain
            </option>
            <option value="https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}">
              USGS Satellite image
            </option>
          </FormControl>
        </Col>
      </Row>
    </FormGroup>
  );
};

export default BaseMapController;

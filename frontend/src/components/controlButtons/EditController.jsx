import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { FormGroup, FormLabel, FormCheck } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

import { SHOW_EDIT } from "../../store/constrains/geodata";
import axios from "axios";
const BaseMapController = () => {
  const dispatch = useDispatch();
  const [checkbox, setCheckbox] = useState(false);

  const checkboxHandler = (e) => {
    setCheckbox(!checkbox);
    dispatch({ type: SHOW_EDIT });
  };

  const clickHandler = async () => {
    const { data } = await axios.get("/api/userdata");
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(data, null, 2).replaceAll("geom", "object")], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = "data.geojson";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };
  return (
    <FormGroup>
      <Row className="px-3">
        <Col>
          <FormCheck className="d-inline mr-3 ml-1" checked={checkbox} onChange={checkboxHandler} />
          <FormLabel className="text-white">
            {" "}
            Edit your data{" "}
            <i
              className="fas fa-question"
              title="The data are stored only for 24 hours this data are only for displaying &#013;The site does not addresses security, it only show cases how to save objects using leaflet and postgis.&#013;The data should be only accessible with athorization settings or saved in localstroage, but this would not interact with postgis and this is the main purpose of the project "
            />
          </FormLabel>
        </Col>
        <Col lg={7} xs={8} className="justify-content-end align-items-center d-flex m-0 p-0">
          {checkbox && (
            <div className="btn bg-light p-0 px-2 m-0" onClick={clickHandler}>
              Download data
            </div>
          )}
        </Col>
      </Row>
    </FormGroup>
  );
};

export default BaseMapController;

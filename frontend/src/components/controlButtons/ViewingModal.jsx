import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Modal, Button, ListGroup, Form } from "react-bootstrap";

import ColorPicker from "./ColorPicker";
import { UPDATE_LAYER_STYLE } from "../../store/constrains/geodata";

const ViewModal = ({ title, closeHandler, show, pointLayer }) => {
  const dispatch = useDispatch();

  const style = useSelector((state) => state.style[title]);
  const [weight, setWeight] = useState(style.weight);
  const [lineColor, setLineColor] = useState(style.color);
  const [lineOpacity, setLineOpacity] = useState(style.opacity);
  const [polygonOpacity, setPolygonOpacity] = useState(style.fillOpacity);
  const [polygonColor, setPolygonColor] = useState(style.fillColor);
  const [radiusSize, setRadiusSize] = useState(style.radius);

  const sendHandler = () => {
    if (show) {
      dispatch({
        type: UPDATE_LAYER_STYLE,
        payload: {
          [title]: {
            ...style,
            weight: Number(weight),
            color: lineColor,
            fillColor: polygonColor,
            opacity: lineOpacity,
            fillOpacity: polygonOpacity,
            radius: radiusSize,
          },
        },
      });
      closeHandler();
    }
  };

  return (
    <Modal onHide={closeHandler} show={show}>
      <Modal.Header closeButton>Editing view for layer {title}</Modal.Header>
      <Modal.Body>
        <ListGroup>
          {pointLayer && (
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Border opacity:
              <div className="w-50 d-flex align-items-center justify-content-end">
                1px
                <Form.Control
                  className="d-inline mx-1"
                  style={{ width: "60%" }}
                  type="range"
                  value={radiusSize}
                  min={0}
                  max={25}
                  onChange={(e) => {
                    setRadiusSize(e.target.value);
                  }}
                />
                25px
              </div>
            </ListGroup.Item>
          )}
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            Border weight:
            <Form.Control
              as="select"
              className="w-25 d-inline"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            >
              <option value={1}>1px</option>
              <option value={2}>2px</option>
              <option value={3}>3px</option>
              <option value={4}>4px</option>
              <option value={5}>5px</option>
            </Form.Control>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            Border color:
            <ColorPicker
              color={lineColor}
              stateFunc={setLineColor}
              opacity={lineOpacity}
              setOpacity={setLineOpacity}
            />
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            Border opacity:
            <div className="w-50 d-flex align-items-center justify-content-end">
              0%
              <Form.Control
                className="d-inline mx-1"
                style={{ width: "60%" }}
                type="range"
                value={lineOpacity * 100}
                min={0}
                max={100}
                onChange={(e) => {
                  setLineOpacity(e.target.value / 100);
                }}
              />
              100%
            </div>
          </ListGroup.Item>

          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            Fill color:
            <ColorPicker
              color={polygonColor}
              stateFunc={setPolygonColor}
              opacity={polygonOpacity}
              setOpacity={setPolygonOpacity}
            />
          </ListGroup.Item>

          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            Fill opacity:
            <div className="w-50 d-flex align-items-center justify-content-end">
              0%
              <Form.Control
                className="d-inline mx-1"
                style={{ width: "60%" }}
                type="range"
                value={polygonOpacity * 100}
                min={0}
                max={100}
                onChange={(e) => {
                  setPolygonOpacity(e.target.value / 100);
                }}
              />
              100%
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={closeHandler}>
          Close
        </Button>
        <Button variant="primary" onClick={sendHandler}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewModal;

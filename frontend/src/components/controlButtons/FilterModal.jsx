import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Modal, Button, ListGroup, Form } from "react-bootstrap";

const ViewModal = ({ title, closeHandler, show, action_type }) => {
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const [param1, setParam1] = useState(null);
  const [param2, setParam2] = useState(null);
  const [param1Value, setParam1Value] = useState(null);
  const [param2Value, setParam2Value] = useState(null);
  const [param1Operator, setParam1Operator] = useState("=");
  const [param2Operator, setParam2Operator] = useState("=");
  const [param2Check, setParam2Check] = useState(false);

  const { orginal_values } = useSelector((state) => state[title]);

  useEffect(() => {
    setData(orginal_values);
  }, [orginal_values]);

  useEffect(() => {
    if (param2Check === false && param1 && param1Value && orginal_values) {
      setData(
        orginal_values.filter((item) => {
          const query1 =
            param1Operator === "="
              ? // eslint-disable-next-line
                item.properties[param1] == param1Value
              : param1Operator === ">="
              ? item.properties[param1] >= Number(param1Value)
              : item.properties[param1] <= Number(param1Value);
          return query1;
        })
      );
    } else if (param2Check === false && !param1Value) {
      setData(orginal_values);
    } else if (
      param2Check === true &&
      param1 &&
      param1Value &&
      orginal_values &&
      param2 &&
      param2Value
    ) {
      setData(
        orginal_values.filter((item) => {
          const query1 =
            param1Operator === "="
              ? // eslint-disable-next-line
                item.properties[param1] == param1Value
              : param1Operator === ">="
              ? item.properties[param1] >= Number(param1Value)
              : item.properties[param1] <= Number(param1Value);
          const query2 =
            param2Operator === "="
              ? // eslint-disable-next-line
                item.properties[param2] == param1Value
              : param2Operator === ">="
              ? item.properties[param2] >= Number(param2Value)
              : item.properties[param2] <= Number(param2Value);
          return query1 && query2;
        })
      );
    } else if (
      param2Check === true &&
      param1 &&
      param1Value &&
      orginal_values &&
      param2 &&
      !param2Value
    ) {
      setData(
        orginal_values.filter((item) => {
          const query1 =
            param1Operator === "="
              ? // eslint-disable-next-line
                item.properties[param1] == param1Value
              : param1Operator === ">="
              ? item.properties[param1] >= Number(param1Value)
              : item.properties[param1] <= Number(param1Value);
          return query1;
        })
      );
    }
  }, [
    param1,
    param1Operator,
    param1Value,
    param2,
    param2Operator,
    param2Value,
    param2Check,
    orginal_values,
  ]);

  const sendHandler = () => {
    dispatch({ type: action_type, payload: data });
    closeHandler();
  };

  const resetHandler = () => {
    dispatch({ type: action_type, payload: orginal_values });
    closeHandler();
  };

  return (
    <Modal onHide={closeHandler} show={show}>
      <Modal.Header closeButton>{`Editing layer ${title}`}</Modal.Header>
      <Modal.Body>
        <ListGroup>
          <ListGroup.Item className="px-1 py-2 pl-4">
            Attribute 1:
            <Form.Control
              className="d-inline ml-2 p-0"
              style={{ width: "20%" }}
              as="select"
              onChange={(e) => setParam1(e.target.value)}
            >
              {orginal_values &&
                Object.keys(orginal_values[0].properties).map((prop) => (
                  <option value={prop} key={prop + "_param1"}>
                    {prop}
                  </option>
                ))}
            </Form.Control>
            {param1 && (
              <Form.Control
                className="d-inline ml-2 p-0"
                style={{ width: "8%" }}
                as="select"
                onChange={(e) => setParam1Operator(e.target.value)}
              >
                <option value="=">=</option>
                {orginal_values[0] && typeof orginal_values[0].properties[param1] === "number" ? (
                  <>
                    <option value=">=">{">="}</option>
                    <option value="<=">{"<="}</option>
                  </>
                ) : null}
              </Form.Control>
            )}
            {param1 && (
              <Form.Control
                className="d-inline ml-2"
                type={typeof orginal_values[0].properties[param1] === "number" ? "number" : "text"}
                style={{ width: "40%" }}
                onChange={(e) => setParam1Value(e.target.value)}
              />
            )}
          </ListGroup.Item>
          <ListGroup.Item className="px-1 py-2">
            <Form.Check
              checked={param2Check}
              onChange={() => setParam2Check(!param2Check)}
              className="d-inline mr-2"
            />
            Attribute 2:
            <Form.Control
              disabled={!param2Check}
              className="d-inline ml-2 p-0"
              style={{ width: "20%" }}
              as="select"
              onChange={(e) => setParam2(e.target.value)}
            >
              {orginal_values &&
                Object.keys(orginal_values[0].properties).map((prop) => (
                  <option value={prop} key={prop + "_param2"}>
                    {prop}
                  </option>
                ))}
            </Form.Control>
            {param2 && (
              <Form.Control
                disabled={!param2Check}
                className="d-inline ml-2 p-0"
                style={{ width: "8%" }}
                as="select"
                onChange={(e) => setParam2Operator(e.target.value)}
              >
                <option value="=">=</option>
                {orginal_values[0] && typeof orginal_values[0].properties[param2] === "number" ? (
                  <>
                    <option value=">=">{">="}</option>
                    <option value="<=">{"<="}</option>
                  </>
                ) : null}
              </Form.Control>
            )}
            {param2 && (
              <Form.Control
                disabled={!param2Check}
                type={typeof orginal_values[0].properties[param2] === "number" ? "number" : "text"}
                className="d-inline ml-2"
                style={{ width: "40%" }}
                onChange={(e) => setParam2Value(e.target.value)}
              />
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <p>total features: {data ? data.length : null} feature </p>
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={closeHandler}>
          Cancel
        </Button>
        <Button variant="primary" onClick={resetHandler}>
          Reset
        </Button>
        <Button variant="primary" onClick={sendHandler}>
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewModal;

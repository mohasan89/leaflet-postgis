import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Modal, Button, Table, Pagination } from "react-bootstrap";

import { ZOOM_OBJECT } from "../../store/constrains/geodata";

const ViewModal = ({ title, closeHandler, show }) => {
  const { values } = useSelector((state) => state[title]);

  const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setPage(0);
  }, [values]);
  return (
    <Modal onHide={closeHandler} show={show} className="px-5 atrribute-modal">
      <Modal.Header closeButton>Attributes for layer {title}</Modal.Header>
      <Modal.Body>
        <Table striped hover>
          <thead>
            <tr>
              {Object.keys(values[0].properties).map((item) => (
                <th key={item}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {values.slice(page * 15, (page + 1) * 15).map((item) => (
              <tr key={item.properties.id}>
                {Object.values(item.properties).map((e) => (
                  <td key={item.properties.id + e} className="py-0 px-2">
                    {e}
                  </td>
                ))}
                <td className="py-0 px-2">
                  <div
                    className="btn bg-light p-0"
                    onClick={() => {
                      dispatch({ type: ZOOM_OBJECT, payload: item });
                    }}
                  >
                    <i className="fas fa-search" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination className="d-flex align-items-center">
          <Pagination.First onClick={() => setPage(0)} disabled={page === 0} />
          <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 0} />
          <p className="py-0 px-2 m-0 ">{`page ${page + 1} of ${Math.round(
            values.length / 15
          )}`}</p>
          <Pagination.Next
            onClick={() => setPage(page + 1)}
            disabled={page >= Math.round(values.length / 15) - 1}
          />
          <Pagination.Last
            onClick={() => setPage(Math.round(values.length / 15) - 1)}
            disabled={page >= Math.round(values.length / 15) - 1}
          />
        </Pagination>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={closeHandler}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewModal;

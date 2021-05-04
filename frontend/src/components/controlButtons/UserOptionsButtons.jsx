import React, { useState } from "react";
import { FormGroup, FormCheck, FormLabel, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import Modal from "./ViewingModal";
import FilterModal from "./FilterModal";

const CountriesController = ({ layer, dataLoader, dataFilterAction, dataVisAction }) => {
  const [mapVis, setMapVis] = useState(false);
  const [modalVis, setModalVis] = useState(false);
  const [modalFilterVis, setModalFilterVis] = useState(false);

  const { loading, values, error } = useSelector((state) => state[layer]);

  const dispatch = useDispatch();

  const checkboxHandler = () => {
    setMapVis(!mapVis);
    if (!mapVis & !values) {
      dispatch(dataLoader());
    } else {
      dispatch({ type: dataVisAction });
    }
  };

  return (
    <FormGroup className="p-3 d-flex justify-content-between w-100">
      <div>
        <FormCheck className="d-inline mr-3 ml-1" checked={mapVis} onChange={checkboxHandler} />
        <FormLabel className="text-white">{layer}</FormLabel>

        {loading && (
          <>
            <Spinner variant="light" animation="border" className="ml-4" size="sm" />
            <span className="text-white"> loading...</span>
          </>
        )}
        {error && (
          <span className="text-danger ml-2" title="try again later by turning layer on and off">
            <i className="fas fa-times" />
            error when loading
          </span>
        )}
      </div>
      {values && mapVis && (
        <div>
          <div
            className="btn bg-light mx-2 px-2 py-0"
            onClick={() => {
              setModalVis(true);
            }}
          >
            <i className="fas fa-pen" />
          </div>
          <div
            className="btn bg-light mx-2 px-2 py-0"
            onClick={() => {
              setModalFilterVis(true);
            }}
          >
            <i className="fas fa-filter" />
          </div>
          <div
            className="btn bg-light mx-2 px-2 py-0"
            onClick={() => {
              setModalFilterVis(true);
            }}
          >
            <i className="fas fa-table" />
          </div>
        </div>
      )}
      <Modal
        title="countries"
        polygonLayer={true}
        show={modalVis}
        closeHandler={() => setModalVis(false)}
      />
      <FilterModal
        title="countries"
        show={modalFilterVis}
        action_type={dataFilterAction}
        closeHandler={() => setModalFilterVis(false)}
      />
    </FormGroup>
  );
};

export default CountriesController;

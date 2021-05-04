import React, { useState } from "react";
import { FormGroup, FormCheck, FormLabel, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import ModalsController from "./ModalsController";

const LayerButtonsController = ({
  layer,
  dataLoader,
  dataFilterAction,
  dataVisAction,
  pointLayer,
}) => {
  const [mapVis, setMapVis] = useState(false);

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
        <ModalsController
          layer={layer}
          dataFilterAction={dataFilterAction}
          pointLayer={pointLayer}
        />
      )}
    </FormGroup>
  );
};

export default LayerButtonsController;

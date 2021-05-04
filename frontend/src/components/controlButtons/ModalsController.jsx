import React, { useState } from "react";

import Modal from "./ViewingModal";
import FilterModal from "./FilterModal";
import TableModal from "./TableModal";

const ModalsController = ({ layer, dataFilterAction, pointLayer }) => {
  const [modalVis, setModalVis] = useState(false);
  const [modalFilterVis, setModalFilterVis] = useState(false);
  const [tableModalVis, setTableModalVis] = useState(false);

  return (
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
          setTableModalVis(true);
        }}
      >
        <i className="fas fa-table" />
      </div>
      <Modal
        title={layer}
        polygonLayer={true}
        pointLayer={pointLayer}
        show={modalVis}
        closeHandler={() => setModalVis(false)}
      />
      <FilterModal
        title={layer}
        show={modalFilterVis}
        action_type={dataFilterAction}
        closeHandler={() => setModalFilterVis(false)}
      />
      <TableModal title={layer} show={tableModalVis} closeHandler={() => setTableModalVis(false)} />
    </div>
  );
};

export default ModalsController;

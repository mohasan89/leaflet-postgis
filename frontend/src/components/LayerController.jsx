import React from "react";

import EditLayer from "./controlButtons/EditController";
import LayerButtonsController from "./controlButtons/LayerButtonsController";
import BaseMapController from "./controlButtons/BaseMapController";
import {
  FILTER_CITIES_GEO_DATA,
  FILTER_GEO_DATA,
  VISIBLE_CITIES_GEO_DATA,
  VISIBLE_GEO_DATA,
} from "../store/constrains/geodata";
import { loadCities, loadCountries } from "../store/actions/geodataActions";
const LayerController = () => {
  return (
    <div className="bg-dark w-100 h-100 p-4">
      <BaseMapController />
      <LayerButtonsController
        layer="countries"
        dataFilterAction={FILTER_GEO_DATA}
        dataVisAction={VISIBLE_GEO_DATA}
        dataLoader={loadCountries}
      />
      <LayerButtonsController
        layer="cities"
        dataFilterAction={FILTER_CITIES_GEO_DATA}
        dataVisAction={VISIBLE_CITIES_GEO_DATA}
        dataLoader={loadCities}
        pointLayer={true}
      />
      <EditLayer />
    </div>
  );
};

export default LayerController;

import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import {
  countries_reducers,
  basemap_reducers,
  layers_styles,
  cities_reducers,
  zoom_reducer,
  edit_reducer,
} from "./reducers/geodata_reducer";

const reducers = combineReducers({
  countries: countries_reducers,
  basemap: basemap_reducers,
  style: layers_styles,
  cities: cities_reducers,
  zoom: zoom_reducer,
  edit: edit_reducer,
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;

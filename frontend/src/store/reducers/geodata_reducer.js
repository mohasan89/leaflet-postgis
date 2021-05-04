import {
  LOAD_GEO_DATA,
  SUCCESS_GEO_DATA,
  FAIL_GEO_DATA,
  VISIBLE_GEO_DATA,
  FILTER_GEO_DATA,
  LOAD_CITIES_GEO_DATA,
  SUCCESS_CITIES_GEO_DATA,
  FAIL_CITIES_GEO_DATA,
  VISIBLE_CITIES_GEO_DATA,
  FILTER_CITIES_GEO_DATA,
  CHANGE_BASEMAP,
  CHANGE_VIS_BASEMAP,
  UPDATE_LAYER_STYLE,
  ZOOM_OBJECT,
  SHOW_EDIT,
} from "../constrains/geodata";

export const countries_reducers = (
  state = { loading: false, values: null, error: false, vis: false },
  dispatch
) => {
  switch (dispatch.type) {
    case LOAD_GEO_DATA:
      return { ...state, loading: true };
    case SUCCESS_GEO_DATA:
      return {
        ...state,
        loading: false,
        values: dispatch.payload,
        orginal_values: dispatch.payload,
        error: null,
      };
    case FAIL_GEO_DATA:
      return { ...state, loading: false, error: true };
    case VISIBLE_GEO_DATA:
      return { ...state, vis: !state.vis };
    case FILTER_GEO_DATA:
      return { ...state, values: dispatch.payload };
    default:
      return { ...state };
  }
};

export const cities_reducers = (
  state = { loading: false, values: null, error: false, vis: false },
  dispatch
) => {
  switch (dispatch.type) {
    case LOAD_CITIES_GEO_DATA:
      return { ...state, loading: true };
    case SUCCESS_CITIES_GEO_DATA:
      return {
        ...state,
        loading: false,
        values: dispatch.payload,
        orginal_values: dispatch.payload,
        error: null,
      };
    case FAIL_CITIES_GEO_DATA:
      return { ...state, loading: false, error: true };
    case VISIBLE_CITIES_GEO_DATA:
      return { ...state, vis: !state.vis };
    case FILTER_CITIES_GEO_DATA:
      return { ...state, values: dispatch.payload };
    default:
      return { ...state };
  }
};

export const basemap_reducers = (
  state = { vis: true, url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" },
  dispatch
) => {
  switch (dispatch.type) {
    case CHANGE_BASEMAP:
      return { ...state, url: dispatch.payload };
    case CHANGE_VIS_BASEMAP:
      return { ...state, vis: !state.vis };
    default:
      return state;
  }
};

export const layers_styles = (
  state = {
    countries: {
      color: "#FF0000",
      opacity: 1,
      weight: 1,
      fillColor: "#FF0000",
      fillOpacity: 0.3,
      interactive: false,
    },
    cities: {
      color: "#228B22",
      opacity: 1,
      weight: 1,
      fillColor: "#228B22",
      fillOpacity: 0.7,
      interactive: true,
      radius: 5,
    },
  },
  dispatch
) => {
  switch (dispatch.type) {
    case UPDATE_LAYER_STYLE:
      state[Object.keys(dispatch.payload)[0]] = dispatch.payload[Object.keys(dispatch.payload)[0]];
      return { ...state };
    default:
      return state;
  }
};

export const zoom_reducer = (state = {}, dispatch) => {
  switch (dispatch.type) {
    case ZOOM_OBJECT:
      return { ...dispatch.payload };
    default:
      return state;
  }
};

export const edit_reducer = (state = { show: false }, dispatch) => {
  switch (dispatch.type) {
    case SHOW_EDIT:
      return { ...state, show: !state.show };
    default:
      return state;
  }
};

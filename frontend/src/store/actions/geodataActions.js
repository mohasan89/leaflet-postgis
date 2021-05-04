import {
  SUCCESS_GEO_DATA,
  LOAD_GEO_DATA,
  FAIL_GEO_DATA,
  VISIBLE_GEO_DATA,
  SUCCESS_CITIES_GEO_DATA,
  LOAD_CITIES_GEO_DATA,
  FAIL_CITIES_GEO_DATA,
  VISIBLE_CITIES_GEO_DATA,
  CHANGE_BASEMAP,
  CHANGE_VIS_BASEMAP,
} from "../constrains/geodata";

import axios from "axios";

export const loadCountries = () => async (dispatch) => {
  try {
    dispatch({ type: VISIBLE_GEO_DATA });
    dispatch({ type: LOAD_GEO_DATA });
    const res = await axios.get("/api/countries");
    const { data } = res;
    dispatch({ type: SUCCESS_GEO_DATA, payload: data });
  } catch (err) {
    dispatch({ type: FAIL_GEO_DATA });
  }
};

export const loadCities = () => async (dispatch) => {
  try {
    dispatch({ type: VISIBLE_CITIES_GEO_DATA });
    dispatch({ type: LOAD_CITIES_GEO_DATA });
    const res = await axios.get("/api/cities");
    const { data } = res;
    dispatch({ type: SUCCESS_CITIES_GEO_DATA, payload: data });
  } catch (err) {
    dispatch({ type: FAIL_CITIES_GEO_DATA });
  }
};

export const changeBaseMap = (base) => (dispatch) => {
  dispatch({ type: CHANGE_BASEMAP, payload: base });
};

export const changeVisBaseMap = () => (dispatch) => {
  dispatch({ type: CHANGE_VIS_BASEMAP });
};

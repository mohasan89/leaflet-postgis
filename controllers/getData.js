"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putUserData = exports.deleteUserData = exports.postUserData = exports.getUserData = exports.getCities = exports.getCountries = void 0;
var database_1 = __importDefault(require("../model/database"));
var getCountries = function (req, res, next) {
    database_1.default.query('SELECT json_build_object(\'id\', country_id, \'name\', country_name, \'iso\',iso_a3) as properties, st_asgeojson(geom)::json as geometry, \'Feature\' as type FROM countries;')
        .then(function (results) {
        res.json(results[0]);
    })
        .catch(function (err) {
        err.status = 500;
        next(err);
    });
};
exports.getCountries = getCountries;
var getCities = function (req, res, next) {
    database_1.default.query('SELECT json_build_object(\'id\', id, \'name\', city,  \'population\',population, \'capital\',capital, \'country\',country) as properties, st_asgeojson(geom)::json as geometry, \'Feature\' as type from cities')
        .then(function (results) {
        res.json(results[0]);
    })
        .catch(function (err) {
        err.status = 500;
        next(err);
    });
};
exports.getCities = getCities;
var getUserData = function (req, res, next) {
    database_1.default.query('select * from user_data where DATE_PART(\'day\', now()-created_at)<1;')
        .then(function (results) {
        res.json(results[0]);
    })
        .catch(function (err) {
        err.status = 500;
        next(err);
    });
};
exports.getUserData = getUserData;
var postUserData = function (req, res, next) {
    if (req.body.geometry.type === 'Point') {
        req.body.geometry.coordinates = [req.body.geometry.coordinates[1], req.body.geometry.coordinates[0]];
    }
    database_1.default.query("insert into user_data (geom)values (st_geomfromgeojson('" + JSON.stringify(req.body.geometry) + "'));")
        .then(function (results) {
        res.json(results[0]);
    })
        .catch(function (err) {
        err.status = 500;
        next(err);
    });
};
exports.postUserData = postUserData;
var deleteUserData = function (req, res, next) {
    if (req.body.geometry.type === 'Point') {
        req.body.geometry.coordinates = [req.body.geometry.coordinates[1], req.body.geometry.coordinates[0]];
    }
    database_1.default.query("delete from user_data where geom = st_geomfromgeojson('" + JSON.stringify(req.body.geometry) + "');")
        .then(function (results) {
        res.json(results[0]);
    })
        .catch(function (err) {
        err.status = 500;
        next(err);
    });
};
exports.deleteUserData = deleteUserData;
var putUserData = function (req, res, next) {
    if (req.body.geometry_update.type === 'Point') {
        req.body.geometry_update.coordinates = [req.body.geometry_update.coordinates[1], req.body.geometry_update.coordinates[0]];
        req.body.geometry.coordinates = [req.body.geometry.coordinates[1], req.body.geometry.coordinates[0]];
    }
    database_1.default.query("update user_data set geom = st_geomfromgeojson('" + JSON.stringify(req.body.geometry_update) + "') where geom = st_geomfromgeojson('" + JSON.stringify(req.body.geometry) + "');")
        .then(function (results) {
        res.json(results[0]);
    })
        .catch(function (err) {
        err.status = 500;
        next(err);
    });
};
exports.putUserData = putUserData;

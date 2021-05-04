"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getData_1 = require("../controllers/getData");
var express_1 = __importDefault(require("express"));
var route = express_1.default.Router();
route.get('/countries', getData_1.getCountries);
route.get('/cities', getData_1.getCities);
route.get('/userdata', getData_1.getUserData);
route.post('/userdata', getData_1.postUserData);
route.delete('/userdata', getData_1.deleteUserData);
route.put('/userdata', getData_1.putUserData);
exports.default = route;

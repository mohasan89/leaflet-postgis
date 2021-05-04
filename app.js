"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
var express_1 = __importDefault(require("express"));
var getGeographicData_1 = __importDefault(require("./routers/getGeographicData"));
var path_1 = __importDefault(require("path"));
var app = express_1.default();
app.use(express_1.default.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(function (error, req, res, next) {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || 'Internal server error'
        }
    });
});
app.use('/api', getGeographicData_1.default);
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "/frontend/build")));
    app.get("*", function (req, res) {
        // @ts-ignore
        res.sendFile(path_1.default.resolve(__dirname), "frontend", "build", "index.html");
    });
}
else {
    app.get("/", function (req, res) {
        res.json({ hi: "hi" });
    });
}
app.listen(process.env.PORT || '5000');

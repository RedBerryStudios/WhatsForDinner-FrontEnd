const path = require("path");
const glob = require("glob");
const express = require("express");
const bodyParser = require("body-parser");

const ENDPOINTS_GLOB = path.join(__dirname, "endpoints", "*.js");

const Loader = {
    Loader(portNum) {
        this.port = portNum;

        this.app = express();
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        this.router = express.Router();

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use("/", this.router);
    },
    load() {
        return new Promise(function (resolve, reject) {
            glob(ENDPOINTS_GLOB, function resolveMatches(err, matches) {
                if (err) {
                    return reject(err);
                }

                matches.forEach(function (endpointPath) {
                    this.loadEndpoint(endpointPath);
                }, this);

                resolve();
            }.bind(this));
        }.bind(this));
    },
    loadEndpoint(endpointPath) {
        let endpoint;

        try {
            endpoint = require(endpointPath);
        } catch (err) {
            console.log("Could not load endpoint:", endpointPath);

            return;
        }

        if (!Object.prototype.hasOwnProperty.call(endpoint, "registerEndpoints")) {
            console.log("Malformed endpoint:", endpointPath);

            return;
        }

        endpoint.registerEndpoints(this.router);

        console.log("Loaded endpoint:", endpointPath);
    },
    start() {
        this.app.listen(this.port, function () {
            console.log(`REST endpoints started, listening on ${this.port}!`);
        }.bind(this));
    }
};

module.exports = Loader;
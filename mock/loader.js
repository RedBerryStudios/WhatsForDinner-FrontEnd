const path = require("path");
const glob = require("glob");
const express = require("express");

const ENDPOINTS_GLOB = path.join(__dirname, "endpoints", "*.js");

const Loader = {
    Loader() {
        this.router = express.Router();
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
            console.log("Could not load endpoint:", endpointPath, err);
            return;
        }

        if (!Object.prototype.hasOwnProperty.call(endpoint, "registerEndpoints")) {
            console.log("Malformed endpoint:", endpointPath);
            return;
        }

        endpoint.registerEndpoints(this.router);

        console.log("Loaded endpoint:", endpointPath);
    }
};

module.exports = Loader;
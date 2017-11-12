const Loader = require("./loader");

const loader = Object.create(Loader);

loader.Loader(process.env.PORT ? process.env.PORT : 3000);

loader.load()
    .then(function endpointsLoaded() {
        loader.start();
    });
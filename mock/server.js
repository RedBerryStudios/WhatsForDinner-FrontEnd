const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const jwt = require("express-jwt");
const Loader = require("./loader");

const loader = Object.create(Loader);

loader.Loader();

router.render = (req, res) => {
    let r = Object.create(null);

    let regexp = /.*(group(s)?|member(s)?|day(s)?|list(s)?|board(s)).*/;
    let rootNames = regexp.exec(req.url);

    if (rootNames) {
        r[rootNames[1]] = res.locals.data;
        res.jsonp(r);
    } else {
        res.end();
    }

};

loader.load()
    .then(() => {
        server.use(middlewares);
        server.use(jsonServer.bodyParser);

        server.use(jwt({ secret: "ExtraSecretJWTSigningKey!" }).unless({ path: ["/auth"] }));

        server.use(loader.router);

        server.use(router);

        server.use(function (err, req, res, next) {
            if (err.name === "UnauthorizedError") {
                res.status(401).json({
                    error: "Invalid authentication token!"
                });
            } else {
                console.log(err);
            }
        });

        server.listen(3000, () => {
            console.log("JSON Server is running");
        });
    });
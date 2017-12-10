const fs = require("fs");
const path = require("path");
const request = require("superagent");
const jwt = require("jsonwebtoken");

const PostAuthEndpoint = {
    PostAuthEndpoint(router) {
        router.post("/auth", this.handle.bind(this));
    },
    async handle(req, res) {
        if (req.body && req.body.provider && req.body.code) {
            let email;
            switch (req.body.provider) {
            case "facebook":
                email = await this.facebookAuthCheck(req.body.code);
                console.log(email);
                break;
            case "google":
                email = await this.googleAuthCheck(req.body.code);
                console.log(email);
                break;
            default:
                res.status(400).json({ error: "Unknown provider!" });
                return;
            }

            let p = path.join(__dirname, "..", "db.json");
            let dbString = fs.readFileSync(p);
            let db = JSON.parse(dbString);

            let member = db.members.filter(m => m.email === email)[0];

            let jwtToken = jwt.sign(
                {
                    sub: email,
                    member: member
                },
                "ExtraSecretJWTSigningKey!",
                {
                    expiresIn: "1h"
                }
            );

            res.status(200).json({
                jwt: jwtToken
            });


        } else {
            res.status(400).json({
                error: "Missing authentication code!"
            });
        }

        res.end();
    },
    async facebookAuthCheck(code) {
        let email = await request
            .get("https://graph.facebook.com/v2.11/oauth/access_token")
            .query({
                client_id: "204469666764169",
                redirect_uri: "http://localhost/login/torii/redirect.html",
                client_secret: "358566e68d236e84fe9f2404a29046e4",
                code: code
            })
            .then(async function(resp) {
                let e = await request
                    .get("https://graph.facebook.com/v2.11/me")
                    .query({
                        fields: "id,name,email",
                        format: "json",
                        pretty: 0,
                        method: "get",
                        access_token: resp.body.access_token
                    })
                    .then(function(personString) {
                        let person = JSON.parse(personString.text);

                        return person.email;
                    });

                return e;

            });
        
        return email;
    },
    async googleAuthCheck(code) {
        let email = await request
            .post("https://www.googleapis.com/oauth2/v4/token")
            .type("form")
            .send({
                code: code,
                redirect_uri: "http://localhost/oauth2callback",
                client_id: "967673291077-avuo2a78dhka1k3ht19l6dblsjn3gsj6.apps.googleusercontent.com",
                client_secret: "lE_QutuZflzDfrSbYHjiGqSY",
                scope: "https://www.googleapis.com/auth/userinfo.email",
                grant_type: "authorization_code"
            })
            .then(async function(response) {
                let e = await request
                    .get("https://www.googleapis.com/plus/v1/people/me")
                    .set("Authentication", `${response.body.token_type} ${response.body.access_token}`)
                    .then(function(resp) {
                        return resp.email;
                    })
                    .catch(function(err) {
                        console.log(err);
                    });

                return e;
            })
            .catch(function(err) {
                console.log(err);
            });

        return email;
    }
};

function registerEndpoints(router) {
    let postAuthEndpoint = Object.create(PostAuthEndpoint);
    postAuthEndpoint.PostAuthEndpoint(router);
}

module.exports = {
    registerEndpoints
};
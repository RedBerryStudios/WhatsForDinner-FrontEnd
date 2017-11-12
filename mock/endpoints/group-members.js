let groups = require("../storage/group-storage");

const GetMembersEndpoint = {
    GetMembersEndpoint(app) {
        app.get("/groups/:groupId/members", this.handle);
    },
    handle(req, res) {
        let group = groups.find((g) => g.id == parseInt(req.params.groupId));

        if (group) {
            res.status(200).json({
                members: group.members
            });
        } else {
            res.status(404).end();
        }
    }
};

const PostMembersEndpoint = {
    PostMembersEndpoint(app) {
        app.post("/groups/:groupId/members", this.handle);
    },
    handle(req, res) {
        if ("memberId" in req.body) {
            let group = groups.find((g) => g.id == parseInt(req.params.groupId));
            if (group) {
                if (group.members.find(m => m == req.body.memberId)) {
                    group.members.push(req.body.memberId);
                }
                res.status(200).end();
            } else {
                res.status(404).end();
            }
        } else {
            res.status(400).end();
        }
    }
};

const DeleteMembersEndpoint = {
    DeleteMembersEndpoint(app) {
        app.delete("/groups/:groupId/members/:memberId", this.handle);
    },
    handle(req, res) {
        let group = groups.find((g) => g.id == parseInt(req.params.groupId));
        if (group) {
            let memberIndex = group.members.findIndex((m) => m == parseInt(req.params.memberId));
            if (memberIndex >= 0) {
                group.members.splice(memberIndex, 1);
                res.status(200).end();
            } else {
                res.status(404).end();
            }
        } else {
            res.status(404).end();
        }
    }
};

function registerEndpoints(app) {
    let getMembersEndpoint = Object.create(GetMembersEndpoint);
    getMembersEndpoint.GetMembersEndpoint(app);

    let postMembersEndpoint = Object.create(PostMembersEndpoint);
    postMembersEndpoint.PostMembersEndpoint(app);

    let deleteMembersEndpoint = Object.create(DeleteMembersEndpoint);
    deleteMembersEndpoint.DeleteMembersEndpoint(app);
}

module.exports = {
    registerEndpoints
};
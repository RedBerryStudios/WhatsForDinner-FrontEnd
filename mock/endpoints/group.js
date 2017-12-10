let groups = require("../storage/group-storage");

const GetGroupEndpoint = {
    GetGroupEndpoint(app) {
        app.get("/groups/:groupId", this.handle);
    },
    handle(req, res) {
        let group = groups.find((g) => g.id == req.params.groupId);

        if (group) {
            group = Object.assign(Object.create(null), group);
            delete group.members;
            delete group.days;
            delete group.lists;

            res
                .status(200)
                .json({
                    group: group
                });
        } else {
            res.status(404).end();
        }
    }
};

const PostGroupEndpoint = {
    PostGroupEndpoint(app) {
        app.post("/groups", this.handle);
    },
    handle(req, res) {
        let newGroup = req.body;

        if (!("id" in newGroup)) {
            let newId = Math.floor(Math.random() * 10000);
            newGroup["id"] = newId;
        }

        groups.push(newGroup);

        res.status(201).json({
            id: newGroup.id
        });

    }
};

const DeleteGroupEndpoint = {
    DeleteGroupEndpoint(app) {
        app.delete("/groups/:groupId", this.handle);
    },
    handle(req, res) {
        let groupIndex = groups.findIndex((g) => g.id == req.params.groupId);
        
        if (groupIndex >= 0) {
            groups.splice(groupIndex, 1);

            res.status(200).end();
        } else {
            res.status(404).end();
        }
    }
};

const PatchGroupEndpoint = {
    PatchGroupEndpoint(app) {
        app.patch("/groups/:groupId", this.handle);
    },
    handle(req, res) {
        let groupIndex = groups.findIndex((g) => g.id == req.params.groupId);

        if (groupIndex >= 0) {
            groups[groupIndex] = Object.assign(groups[groupIndex], req.body);

            res.status(201).end();
        } else {
            res.status(404).end();
        }
    }
};

function registerEndpoints(app) {
    let getGroupEndpoint = Object.create(GetGroupEndpoint);
    getGroupEndpoint.GetGroupEndpoint(app);

    let postGroupEndpoint = Object.create(PostGroupEndpoint);
    postGroupEndpoint.PostGroupEndpoint(app);

    let deleteGroupEndpoint = Object.create(DeleteGroupEndpoint);
    deleteGroupEndpoint.DeleteGroupEndpoint(app);

    let patchGroupEndpoint = Object.create(PatchGroupEndpoint);
    patchGroupEndpoint.PatchGroupEndpoint(app);
}

module.exports = {
    registerEndpoints
};
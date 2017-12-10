let groups = require("../storage/group-storage");

const GetListsEndpoint = {
    GetListsEndpoint(app) {
        app.get("/groups/:groupId/lists", this.handle);
    },
    handle(req, res) {
        let group = groups.find(g => g.id == req.params.groupId);
        if (group) {
            res.status(200).json(group.lists);
        } else {
            res.status(404).end();
        }
    }
};

const PostListsEndpoint = {
    PostListsEndpoint(app) {
        app.post("/groups/:groupId/lists", this.handle);
    },
    handle(req, res) {
        let group = groups.find(g => g.id == req.params.groupId);
        if (group) {
            let newList = req.body;

            if (!("id" in newList)) {
                let newId = Math.floor(Math.random() * 10000);
                newList["id"] = newId;
            }

            group.lists.push(newList);

            res.status(201).json({
                id: newList.id
            });
        } else {
            res.status(404).end();
        }
    }
};

const PatchListsEndpoint = {
    PatchListsEndpoint(app) {
        app.patch("/groups/:groupId/lists/:listId", this.handle);
    },
    handle(req, res) {
        let group = groups.find(g => g.id == req.params.groupId);
        if (group) {
            let list = group.lists.find(l => l.id == parseInt(req.params.listId));
            if (list) {
                list = Object.assign(list, req.body);
                res.status(200).end();
            } else {
                res.status(404).end();
            }
        } else {
            res.status(404).end();
        }
    }
};

const DeleteListsEndpoint = {
    DeleteListsEndpoint(app) {
        app.delete("/groups/:groupId/lists/:listId", this.handle);
    },
    handle(req, res) {
        let group = groups.find(g => g.id == req.params.groupId);
        if (group) {
            let listIndex = group.lists.findIndex(l => l.id == parseInt(req.params.listId));
            if (listIndex >= 0) {
                group.lists.splice(listIndex, 1);
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
    let getListsEndpoint = Object.create(GetListsEndpoint);
    getListsEndpoint.GetListsEndpoint(app);

    let postListsEndpoint = Object.create(PostListsEndpoint);
    postListsEndpoint.PostListsEndpoint(app);

    let patchListsEndpoint = Object.create(PatchListsEndpoint);
    patchListsEndpoint.PatchListsEndpoint(app);

    let deleteListsEndpoint = Object.create(DeleteListsEndpoint);
    deleteListsEndpoint.DeleteListsEndpoint(app);
}

module.exports = {
    registerEndpoints
};
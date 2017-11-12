var members = require("../storage/member-storage");

const GetMemberEndpoint = {
    GetMemberEndpoint(app) {
        app.get("/members/:memberId", this.handle);
    },
    handle(req, res) {
        let member = members.find((m) => m.id == parseInt(req.params.memberId));
        if (member) {
            res.status(200).json(member);
        } else {
            res.status(404).end();
        }
    }
};

const PostMemberEndpoint = {
    PostMemberEndpoint(app) {
        app.post("/members", this.handle);
    },
    handle(req, res) {
        let newMember = req.body;

        if (!("id" in newMember)) {
            let newId = Math.floor(Math.random() * 10000);
            newMember["id"] = newId;
        }

        members.push(newMember);

        res.status(201).json({
            id: newMember.id
        });
    }
};

const PatchMemberEndpoint = {
    PatchMemberEndpoint(app) {
        app.patch("/members/:memberId", this.handle);
    },
    handle(req, res) {
        let memberIndex = members.findIndex((m) => m.id == parseInt(req.params.memberId));

        members[memberIndex] = Object.assign(members[memberIndex], req.body);

        res.status(201).end();
    }
};

const DeleteMemberEndpoint = {
    DeleteMemberEndpoint(app) {
        app.delete("/members/:memberId", this.handle);
    },
    handle(req, res) {
        let memberIndex = members.findIndex((m) => m.id == parseInt(req.params.memberId));

        if (memberIndex >= 0) {
            members.splice(memberIndex, 1);

            res.status(200).end();
        } else {
            res.status(404).end();
        }
    }
};

function registerEndpoints(app) {
    let getMemberEndpoint = Object.create(GetMemberEndpoint);
    getMemberEndpoint.GetMemberEndpoint(app);

    let postMemberEndpoint = Object.create(PostMemberEndpoint);
    postMemberEndpoint.PostMemberEndpoint(app);

    let patchMemberEndpoint = Object.create(PatchMemberEndpoint);
    patchMemberEndpoint.PatchMemberEndpoint(app);

    let deleteMemberEndpoint = Object.create(DeleteMemberEndpoint);
    deleteMemberEndpoint.DeleteMemberEndpoint(app);
}

module.exports = {
    registerEndpoints
};
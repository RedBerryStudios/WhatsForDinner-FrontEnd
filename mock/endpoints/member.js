var members = require("../storage/member-storage");
var groups = require("../storage/group-storage");

const GetMemberEndpoint = {
    GetMemberEndpoint(router) {
        router.get("/members/:memberId", this.handle);
    },
    handle(req, res) {
        let member = members.find((m) => m.id == parseInt(req.params.memberId));
        if (member) {
            res.status(200).json({
                members: member,
                group: groups.find(g => g.id == member.groupId)
            });
        } else {
            res.status(404).end();
        }
    }
};

const PostMemberEndpoint = {
    PostMemberEndpoint(router) {
        router.post("/members", this.handle);
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
    PatchMemberEndpoint(router) {
        router.patch("/members/:memberId", this.handle);
    },
    handle(req, res) {
        let memberIndex = members.findIndex((m) => m.id == parseInt(req.params.memberId));

        members[memberIndex] = Object.assign(members[memberIndex], req.body);

        res.status(201).end();
    }
};

const DeleteMemberEndpoint = {
    DeleteMemberEndpoint(router) {
        router.delete("/members/:memberId", this.handle);
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

function registerEndpoints(router) {
    let getMemberEndpoint = Object.create(GetMemberEndpoint);
    getMemberEndpoint.GetMemberEndpoint(router);

    let postMemberEndpoint = Object.create(PostMemberEndpoint);
    postMemberEndpoint.PostMemberEndpoint(router);

    let patchMemberEndpoint = Object.create(PatchMemberEndpoint);
    patchMemberEndpoint.PatchMemberEndpoint(router);

    let deleteMemberEndpoint = Object.create(DeleteMemberEndpoint);
    deleteMemberEndpoint.DeleteMemberEndpoint(router);
}

module.exports = {
    registerEndpoints
};
let groups = require("../storage/group-storage");

const GetDaysEndpoint = {
    GetDaysEndpoint(app) {
        app.get("/groups/:groupId/days/:date", this.handle);
    },
    handle(req, res) {
        let group = groups.find((g) => g.id == req.params.groupId);
        if (group) {
            let day = group.days.find((d) => d.date == req.params.date);
            if (day) {
                res.status(200).json(day);
            } else {
                res.status(404).end();
            }
        } else {
            res.status(404).end();
        }
    }
};

const PatchDaysEndpoint = {
    PatchDaysEndpoint(app) {
        app.patch("/groups/:groupId/days/:date/boards/:boardId", this.handle);
    },
    handle(req, res) {
        let group = groups.find(g => g.id == req.params.groupId);
        if (group) {
            let day = group.days.find(d => d.date == req.params.date);
            if (day) {
                let board = day.boards.find(b => b.id == parseInt(req.params.boardId));
                if (board) {
                    board = Object.assign(board, req.body);
                    res.status(200).end();
                } else {
                    res.status(404).end();
                }
            } else {
                res.status(404).end();
            }
        } else {
            res.status(404).end();
        }
    }
};

function registerEndpoints(app) {
    let getDaysEndpoint = Object.create(GetDaysEndpoint);
    getDaysEndpoint.GetDaysEndpoint(app);

    let patchDaysEndpoint = Object.create(PatchDaysEndpoint);
    patchDaysEndpoint.PatchDaysEndpoint(app);
}

module.exports = {
    registerEndpoints
};
var express = require('express');

var adminRouter = express.Router();

var router = function () {
    adminRouter.route('/addProjects')
        .get(function (req, res) {
            res.send('inserting project');
        });

    return adminRouter;
};

module.exports = router;

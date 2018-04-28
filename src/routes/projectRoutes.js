var express = require('express');

var projectRouter = express.Router();

var projects = [
    {
        name: 'SmartWatch',
        shortDesc: 'It tells time!'
    },
    {
        name: 'Poster',
        shortDesc: 'So shiny.'
    },
    {
        name: 'Mho-mentum',
        shortDesc: 'We push over oldpeople for science.'
    }
];

projectRouter.route('/')
    .get(function (req, res) {
        res.render('projects', {
            title: 'Projects',
            projects: projects
        });
    });

projectRouter.route('/:id')
    .get(function (req, res) {
        var id = req.params.id;
        res.render('project', {
            title: 'Book',
            project: projects[id]
        });
    });

module.exports = projectRouter;

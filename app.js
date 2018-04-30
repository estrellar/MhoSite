//handle to express
var express = require('express');


var app = express();
var port = 8080;

var projectRouter = require('./src/routes/projectRoutes');
var adminRouter = require('./src/routes/adminRoutes');

//searches in public folder first for requested route
app.use(express.static('public'));

//then src/views 
app.set('views', './src/views');

app.set('view engine', 'ejs');

app.use('/Projects', projectRouter);
app.use('/Admin', adminRouter);
//then all these

var projects = [
    /*{
        name: 'EdgeCube',
        shortDesc: 'A tiny satellite.'
    },
    {
        name: 'SmartWalker',
        shortDesc: 'A walker with sensors.'
    },*/
    {
        name: 'SmartWatch',
        shortDesc: 'It tells time!'
    },
    {
        name: 'Poster',
        shortDesc: 'So shiny.'
    },
    /*{
        name: 'Robot',
        shortDesc: 'Beep boop beep.'
    },*/
    {
        name: 'Mho-mentum',
        shortDesc: 'We push over old people for science.'
    }
];


app.get('/', function (req, res) {
    res.render('index', {
        title: 'Projects',
        projects: projects
    });
});

app.get('/projects', function (req, res) {
    res.send('Hello Projects');
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});

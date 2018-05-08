//handle to express
var express = require('express');
var courier = require('nodemailer');
var auth = require('./auth.json');
var bodyParser = require('body-parser');


var app = express();

bodyParser.urlencoded({
    extended: true
})
app.use(bodyParser.json());

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
        shortDesc: 'We push over old people for science.'
    }
];

app.post('/', function (req, res) {
    try {
        //var jsonData = JSON.parse(req.body);
        var transporter = courier.createTransport({
            service: "Gmail",
            debug: true,
            auth: {
                user: auth.user,
                pass: auth.password
            }
        });
        var mailOptions = {
            from: auth.user,
            to: auth.user,
            cc: "david.house@mhosciences.com,rxestrella@gmail.com",
            subject: req.body.name,
            text: req.body.message + '\nSent from: ' + req.body.email
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error)
                console.log(error);
            else
                console.log('email sent:' + info.response);
        });
    } catch (error) {
        console.log('ERROR: ' + error.message);
        res.render('emailError');
    }
    res.render('index', {
        projects: projects
    });
});


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

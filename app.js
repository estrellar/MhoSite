//handle to express
var express = require('express');


var app = express();
var port = process.env.PORT || 5000;

//searches in public folder first for requested route
app.use(express.static('public'));

//then src/views 
app.set('views', './src/views');

app.set('view engine', 'ejs');


//then all these
app.get('/', function (req, res) {
    res.render('index', {
        title: 'Projects',
        projects: ['Smartwatch',
                  'Smartwalker', 'Mho-mentum']
    });
});

app.get('/projects', function (req, res) {
    res.send('Hello Projects');
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});

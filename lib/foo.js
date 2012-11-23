var express = require('express');
var http = require('http');
var accumulatorY = require('./accumulator.js').accumulatorX;
var base = require('./oo.js').base;
var derived = require('./oo.js').derived;

var app = express();

var a = new accumulatorY(5, 6);
console.log(a.value);

app.get('/helloManual.txt', function (req, res) {
    var body = 'Hello World';
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', body.length);
    res.end(body);
});

// res.send - automatically adds content-length
app.get('/hello.txt', function (req, res) {
    res.send('Hello World');
});

// default
app.get('/', function (req, res) {
    res.send('default resource');
});

// accumulator
app.get('/accumulator', function (req, res) {
    var a = new accumulatorY(5, 6);
    a.add(5);
    var v = a.val;
    var ret = "<html><body><h1>accumulator is at " + a.value + " and " + a.atLimit() + "\n" + a.test() + ":" + v + "</h1></body></html>";
    res.send(ret);
});

// default
app.get('/google', function (req, res) {
    requestGoogle(res);
//    res.send();
});

// uses a regular expression to match - note that query strings are not included in match determination
app.get(/^\/commits\/(\w+)(?:\.\.(\w+))?$/, function (req, res) {
    var from = req.params[0];
    var to = req.params[1] || 'HEAD';
    res.send('commit range ' + from + '..' + to);
});

// handling errors
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.send(500, 'Something broke!');
});

app.listen(3000);
console.log('Listening on port 3000');

var requestGoogle = function (res) {
    // sending a request
    var options = {
        port: 80,
        host: 'www.google.ca'
    };
    var request = http.request(options);
    request.on('response', function (response) {
        response.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
            res.write(chunk);
            res.end();
        });
    });
    request.end();
};

/*function accumulator(initialValue, specifiedLimit) {
    this.value = initialValue;
    this.limit = specifiedLimit;
    this.add = add;
    this.atLimit = atLimit;
};

function add(valueToAdd) {
    this.value = this.value + value;
};

function atLimit() {
    return this.value > this.limit;
};*/

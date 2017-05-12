var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var https = require('https');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

app.use(express.static('./'))
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/instagram', function(incomingReq, outGoingRes) {

    var options = {
        host: 'api.instagram.com',
        path: '/v1/users/self/media/recent/?access_token=3955103033.6949adf.2dcab999ce2a4da08456b7c0ed70c75b&count=12&callback=?',
        port: '443',
        method: 'GET',
        headers: {'Access-Control-Allow-Origin' : '*'}
    };

    var str = ''
    callback = function(instagramRes) {
        instagramRes.setEncoding('utf8');
        instagramRes.on('data', function (chunk) {
            str += chunk;
        });
        instagramRes.on('end', function () {
            outGoingRes.writeHead(200, 
                {'Content-Type': 'text/plain',
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'});
            outGoingRes.end(str);
        });
    }

    var instagramReq = https.get(options, callback);

    instagramReq.on('error', function(e){
        console.log('error from get: '
                     + e.message);
    });
    instagramReq.end();
});

app.get('/facebook', function(incomingReq, outGoingRes) {

    var options = {
        host: 'graph.facebook.com',
        path: '/LoneStarGuideDogRaisersAustin/events?access_token=277927609332317|c4f7351dfd084b4195f8bce985649ce4&since=' + (new Date).getTime(),
        port: '443',
        method: 'GET',
        headers: {'Access-Control-Allow-Origin' : '*'}
    };

    var str = ''
    callback = function(facebookRes) {
        facebookRes.setEncoding('utf8');
        facebookRes.on('data', function (chunk) {
            str += chunk;
        });
        facebookRes.on('end', function () {
            outGoingRes.writeHead(200, 
                {'Content-Type': 'text/plain',
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'});
            outGoingRes.end(str);
        });
    }

    var facebookReq = https.get(options, callback);

    facebookReq.on('error', function(e){
        console.log('error from get: '
                     + e.message);
    });
    facebookReq.end();
});

app.post('/subscribe', function(incomingReq, outGoingRes) {
    var email = incomingReq.body.email;
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'guideDogsTestAustin@gmail.com', // Your email id
            pass: 'nimbleDog' // Your password
        }
    });


    var mailOptions = {
        from: email, // sender address
        to: 'guideDogsTestAustin@gmail.com', // list of receivers
        subject: 'New Subscriber!', // Subject line
        text: 'Hello, ' + email + ' would like to subscribe to the GDB Austin mailing list!' //, // plaintext body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        outGoingRes.writeHead(200, 
                {'Content-Type': 'text/plain',
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'});
        outGoingRes.end();
    });

});

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');


http.createServer(app).listen(app.get('port'), app.get('ip'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
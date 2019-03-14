const nr = require('newrelic');
let express = require('express');
let compress = require('compression');
const port = 8000;

let app = express();
app.use(compress());
app.use(express.static(__dirname + '/public'));

let proxy = require('http-proxy-middleware');
app.use(
  '/api/menu',
  proxy({
    target: 'http://ec2-18-222-202-91.us-east-2.compute.amazonaws.com',
    changeOrigin: true
  })
 );
app.use(
  '/api/reserve',
  proxy({
    target: 'http://ec2-13-59-134-78.us-east-2.compute.amazonaws.com',
    changeOrigin: true
  })
);
app.use(
  '/api/photos',
  proxy({
    target: 'http://ec2-54-159-114-20.compute-1.amazonaws.com',
    changeOrigin: true
  })
);
app.use(
  '/overview',
  proxy({
    target: 'http://ec2-18-191-110-131.us-east-2.compute.amazonaws.com:3000',
    changeOrigin: true
  })
);


let morgan = require('morgan');
app.use(morgan('dev'));
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("*", (req, res) => {
res.sendFile(__dirname + '/public/index.html')});  

app.listen(port, () => {
  console.log('Listening on port', port);
});

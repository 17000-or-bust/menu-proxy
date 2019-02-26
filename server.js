let express = require('express');
let compress = require('compression');
const port = 8000;

let app = express();
app.use(compress());
app.use(express.static(__dirname + '/public'));

let proxy = require('http-proxy-middleware');
app.use(
  '/api/reserve',
  proxy({
    target: 'http://ec2-18-191-229-0.us-east-2.compute.amazonaws.com',
    changeOrigin: true
  })
);
app.use(
  '/api/photos',
  proxy({
    target: 'http://ec2-18-206-121-61.compute-1.amazonaws.com',
    changeOrigin: true
  })
);
app.use(
  '/menu',
  proxy({
    target: 'http://ec2-3-17-28-103.us-east-2.compute.amazonaws.com/',
    changeOrigin: true
  })
);
app.use(
  '/overview',
  proxy({
    target: 'http://ec2-18-191-13-163.us-east-2.compute.amazonaws.com/',
    changeOrigin: true
  })
);

let morgan = require('morgan');
app.use(morgan('dev'));
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/:id', express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log('Listening on port', port);
});

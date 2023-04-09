const express = require('express');
const path = require('path')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');

require('./db.js');




const server = express();
server.name = 'API';


server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
const multer = require('multer');


//Midlewares


//cambiar valores que vienen por default con disStorage a las imagenes
//especificar donde se va a guardar Destination
const storage = multer.diskStorage({
    destination:path.join(__dirname, 'public/uploads'),
    filename: (req,file,next)=>{
        next(null,file.originalname)
    }
})
const upload = multer({
    storage,
    dest: path.join(__dirname, 'public/uploads')
}).single('background_image')

server.use(upload)

//Routes
server.use('/', routes);
//archivos staticos
server.use(express.static(path.join(__dirname,'public')))



// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;

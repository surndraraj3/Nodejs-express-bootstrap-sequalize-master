import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import override  from 'method-override';
// setup global middleware here

module.exports = function(app) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(override());
};

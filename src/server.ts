import * as express from 'express';
import { Application } from 'express';
import { getAllCourses } from './get-courses.route';
import * as companies from './companies.route';

const bodyParser = require('body-parser');
const app: Application = express();

app.use(bodyParser.json());

app.route('/api/courses').get(getAllCourses);
app.route('/api/companies').get(companies.getCompanyList);

app.get('/', function(req, res){
  res.json({title : 'hello world'});
});

// launch an HTTP Server
const httpServer = app.listen(process.env.PORT || 3000, () => {
    console.log('HTTP Server running at http://localhost:' + httpServer.address().port);
});

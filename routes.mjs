import db from './models/index.mjs';

// import your controllers here
import initBugsController from './controllers/bugs.mjs';
import initFeaturesController from './controllers/features.mjs';

export default function bindRoutes(app) {
  // initialize the controller functions here
  // pass in the db for all callbacks
  const bugsController = initBugsController(db);
  const featuresController = initFeaturesController(db);

  // define your route matchers here using app
  app.get('/', (req, res) => { res.render('home'); });
  app.post('/', bugsController.createBug);
  app.get('/bugs', bugsController.getBugs);
  app.get('/features', featuresController.getFeatures);
  app.post('/features', featuresController.createFeature);
}

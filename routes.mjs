import db from './models/index.mjs';

// import your controllers here
import initBugsController from './controllers/bugs.mjs';
import initFeaturesController from './controllers/features.mjs';
import initUsersController from './controllers/users.mjs';

import pkg from './public/helper.js';

const { getHash } = pkg;

const checkAuth = (req, res, next) => {
  req.isLoggedIn = false;

  if (req.cookies.loggedIn && req.cookies.userId) {
    const { loggedIn, userId } = req.cookies;
    const hashedCookie = getHash(userId);

    if (hashedCookie === loggedIn) {
      req.isLoggedIn = true;
    }
  }

  if (req.isLoggedIn === false) {
    res.redirect('/login');
    return;
  }
  next();
};

export default function bindRoutes(app) {
  // initialize the controller functions here
  // pass in the db for all callbacks
  const bugsController = initBugsController(db);
  const featuresController = initFeaturesController(db);
  const userController = initUsersController(db);

  // define your route matchers here using app
  app.get('/', checkAuth, (req, res) => { res.render('home'); });
  app.post('/', bugsController.createBug);
  app.get('/bugs', checkAuth, bugsController.getBugs);
  app.get('/features', checkAuth, featuresController.getFeatures);
  app.post('/features', featuresController.createFeature);

  app.get('/login', checkAuth, (req, res) => { res.redirect('/'); });
  app.post('/login', userController.logIn);
  app.post('/signup', userController.signUp);

  app.delete('/logout', (req, res) => {
    res.clearCookie('userId');
    res.clearCookie('loggedIn');
    res.redirect('login');
  });
}

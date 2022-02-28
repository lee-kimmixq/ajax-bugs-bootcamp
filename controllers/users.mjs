import pkg from '../public/helper.js';

const { getHash } = pkg;

export default function initUsersController(db) {
  const logIn = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await db.User.findOne({ where: { email } });

      if (!user || user.password !== getHash(password)) {
        res.status(403).redirect('/login?login=fail');
        return;
      }

      const hashedCookieString = getHash(user.id);

      res.cookie('loggedIn', hashedCookieString);
      res.cookie('userId', user.id);
      res.redirect('/');
    } catch (err) {
      console.log(err);
    }
  };

  const signUp = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await db.User.findOne({ where: { email } });

      if (user) {
        res.status(403).redirect('/login?signup=fail');
        return;
      }

      const hashedPw = getHash(password);
      await db.User.create({ email, password: hashedPw });

      res.redirect('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return { logIn, signUp };
}

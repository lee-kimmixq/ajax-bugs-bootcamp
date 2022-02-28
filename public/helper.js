const jsSha = require('jssha');

const SALT = process.env.MY_ENV_VAR || 'bugs';

module.exports = {
  getHash: (input) => {
    const shaObj = new jsSha('SHA-512', 'TEXT', { encoding: 'UTF8' });
    shaObj.update(`${input}-${SALT}`);
    return shaObj.getHash('HEX');
  },
};

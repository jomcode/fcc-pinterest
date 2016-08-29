const bcrypt = require('bcryptjs');

const passwordSalt = require('../config').salt;

const hashHof = salt => pw => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(pw, salt, (err, hashedPassword) => {
      if (err) return reject(err);
      return resolve(hashedPassword);
    });
  });
};

const check = (pw, hashedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(pw, hashedPassword, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
};

module.exports.hash = hashHof(passwordSalt);
module.exports.check = check;

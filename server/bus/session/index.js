var Sesion = function(c) {
  this.config = c;
};

Sesion.prototype.createSession = function(session, payload) {
  session.auth = payload;
  return Promise.resolve(session.auth);
};

Sesion.prototype.verifySession = function(session, payload) {
  if (session && session.auth) {
    return Promise.resolve(session.auth);
  } else {
    return Promise.reject('you_are_not_logged_in');
  }
};

Sesion.prototype.closeSession = function(session, payload) {
  delete session.auth;
  return Promise.resolve(true);
};

module.exports = Sesion;

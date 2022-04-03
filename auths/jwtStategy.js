const User = require("../models/User");
var jwt = require("jsonwebtoken");

module.exports = (req, res, done) => {
  if (!req.cookies["jwt"]) {
    console.log("login first");
    res.redirect("/home");
  } else {
    jwt.verify(
      req.cookies["jwt"],
      process.env.JWT_SECRET_KEY,
      (err, payload) => {
        if (err) throw err;
        User.find(payload.email, (err, user) => {
          if (err) return done(null, false);
          req.user = user;
          return done(null, true);
        });
      }
    );
  }
};

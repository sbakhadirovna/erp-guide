const express = require("express");
/**
 *
 * @param {express.Request}req
 * @param {express.Response}res
 * @param {express.NextFunction}next
 */
function isLoggedIn(req, res, next) {
  // console.log("session",req.session);
  if (!req.session.user) {
    return res.redirect("/login");
  }
  req.user = req.session.user;
  res.locals.currentUser = req.user;
  next();
}

module.exports = isLoggedIn;

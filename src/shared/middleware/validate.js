const express = require("express");

function validate(schema) {
  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  return function (req, res, next) {
    // console.log("before",req.body); malumot bosh joylarni tashab ketmagani
    const { error, value } = schema.validate(req.body);
    if (error) {
      req.flash("error",error.details[0].message)
      return res.redirect(req.session.returnTo ||"/");
    }
    req.body = value;
    // console.log("after",req.body);malumot bosh joylarni tashab ketgani
    next();
  };
}
module.exports = validate;

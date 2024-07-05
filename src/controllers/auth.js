const express = require("express");
const { usersDb } = require("../db");
const bcrypt=require('bcryptjs')
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */

const loginPage = (req, res) => {
  console.log("flash",req.flash('error'));
  req.session.returnTo="/login"
  res.render("auth/login",{layout:"layouts/auth"});
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const login = (req, res) => {
  const { username, password } = req.body;
  const existing = usersDb.findByUsername(username);

  if (!existing) {
  req.flash("error","Login yoki parol xato")
    return res.redirect("/login");
  }
  const match=bcrypt.compareSync(password,existing.password)
  if (match) {
    req.flash("error","Login yoki parol xato")
    return res.redirect("/login");
  }
  req.session.user = existing;
  req.flash("success","Welcome")
  res.redirect("/");
};
const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};
module.exports = { 
  loginPage, 
  login, 
  logout };

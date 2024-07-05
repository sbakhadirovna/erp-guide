const express = require("express");
const router = express.Router();
const {
  createUserPage,
  createUser,
  listUsers,
  showUser,
  editUser,
  editUserPage,
  deleteUser,
  userDashboard,
}=require("../controllers/users");
const isLoggedIn = require("../shared/middleware/is-loggid-in");
const hasRole = require("../shared/middleware/has-role");
const validate = require("../shared/middleware/validate");
const { createUserScema, editUserScema } = require("../schemas/users");

router.use((req,res,next)=>{
  res.locals.page="users";
  next();
})
router.get('/',isLoggedIn,userDashboard)
router.get("/users/create",isLoggedIn,hasRole(['admin']),  createUserPage);
router.post("/users/create", isLoggedIn,hasRole(['admin']),validate(createUserScema), createUser );
router.get("/users/list", isLoggedIn,hasRole(['admin']),  listUsers);
router.get("/users/:id", isLoggedIn,hasRole(['admin']), showUser);
router.get("/users/:id/edit", isLoggedIn,hasRole(['admin']), editUserPage);
router.post("/users/:id/edit", isLoggedIn,hasRole(['admin']),validate(editUserScema), editUser );
router.post("/users/:id/delete", isLoggedIn,hasRole(['admin']),  deleteUser);
module.exports = router;

const { usersDb, todosDb, guideDb } = require("../db");
const bcrpt=require('bcryptjs')
const createUserPage = (req, res) => {
  req.session.returnTo="/users/create"
  res.render("users/create");
};
const createUser = (req, res) => {
  const { firstName, lastName, age, Role, username, password } = req.body;
  const existing = usersDb.findByUsername(username);
  if (existing) {
    console.log(`${username} foydalanuvchi mavjud`);
    return res.send(`${username} foydalanuvchi mavjud`);
  }
  usersDb.create({ firstName, lastName, age, Role, username, password:bcrpt.hashSync(password,10) });
  req.flash("success","User successfully added")
  res.redirect("/users/list");
};
const listUsers = (req, res) => {
  const users = usersDb.findAll();
 
  res.render("users/list", { users, succsess:req.flash('success')});
};
const showUser = (req, res) => {
  const { id } = req.params;
  const user = usersDb.findById(id);
  if (!user) {
    req.flash("warning","User not found")
    return res.redirect("/users/list");
  }
  res.render("users/show", { user });
};
const editUserPage = (req, res) => {
  const { id } = req.params;
  const user = usersDb.findById(id);
  if (!user) {
    if (!user) {
      req.flash("warning","User not found")
      return res.redirect("/users/list");
    }
  }
  req.session.returnTo=`/users/${id}/edit`
  res.render("users/edit", { user });
};
const editUser = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age, username, Role } = req.body;
  const user = usersDb.findById(id);
  if (!user) {
    req.flash("error","User not found")
    return res.redirect("/users/list");
  }
  usersDb.update(id, { firstName, lastName, age, username, Role });
  req.flash("success","user successfully edited")
  res.redirect("/users/list");
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const user = usersDb.findById(id);
  if (!user) {
    req.flash("error","User not found")
    return res.redirect("/users/list");
  }
  usersDb.remove(id);

  todosDb.removeAllOfUser(id);
  req.flash("success","user successfully deleted")

  res.redirect("/users/list");
};
const userDashboard=(req,res)=>{
  res.locals.page=null;
  res.render('users/dashboard')
}

module.exports = {
  createUserPage,
  createUser,
  listUsers,
  showUser,
  editUser,
  editUserPage,
  deleteUser,
  userDashboard
};

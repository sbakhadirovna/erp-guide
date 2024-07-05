const { usersDb, guideDb, todosDb } = require("../db");
const { createBulk } = require("../db/todo");

const createGuidePage = (req, res) => {
  req.session.returnTo="/guides/create"
  res.render("guides/create");
};
const createGuide = (req, res) => {
  const { title, content, notify } = req.body;
  const newGuide = guideDb.create({ title, content });
  if (notify) {
    const users = usersDb.findAll();
    const newTodos = users.map((user) =>{
      return {
        user_id: user.id,
        guide_id: newGuide.id,
        completed: false,
      };
    })
    todosDb.createBulk(newTodos);
  }
  req.flash("success",'guide successfully created')
  if(notify){
    req.flash("success","notification sended all users")
  }
  res.redirect("/guides/list");
};

const listGuides = (req, res) => {
  const guide = guideDb.findGuide();
  if (!guide) {
    req.flash("warning","guide not found")
    return res.redirect("/guides/list");
  }
  res.render("guides/list", { guide });
};

const showGuide = (req, res) => {
  const { id } = req.params;
  const guide = guideDb.findById(id);
  if (!guide) {
    req.flash("warning","guide not found")
    return res.redirect("/guides/list");
  }
  res.render("guides/show", { guide });
};

const editGuidePage = (req, res) => {
  const { id } = req.params;
  const guide = guideDb.findById(id);
  if (!guide) {
    req.flash("warning","guide not found")
    return res.redirect("/guides/list");
  }
  req.session.returnTo=`/guides/${id}/edit`
  res.render("guides/edit", { guide });
};

const editGuide = (req, res) => {
  const { id } = req.params;
  const { title, content,notify } = req.body;
  const guide = guideDb.findById(id);
  if (!guide) {
    req.flash("error","guide not found")
    return res.redirect("/guides/list");
  }
  guideDb.update(id, { title, content });
  if (notify) {
    const users = usersDb.findAll();
    const newTodos = users.map((user) => {
      return {
        user_id: user.id,
        guide_id: guide.id,
        completed: false,
      };
    });
    createBulk(newTodos);
  }
  req.flash("success","guide successfully edited")
  res.redirect("/guides/list");
};

const deleteGuide = (req, res) => {
  const { id } = req.params;
  console.log("delete guide", id);
  const guide = guideDb.findById(id);
  if (!guide) {
    req.flash("error","guide not found")
    return res.redirect("/guides/list");
  }
  guideDb.remove(id);
  todosDb.removeAllOfGuide(id)
  req.flash("success","guide successfully deleted")
  res.redirect("/guides/list");
};

module.exports = {
  createGuide,
  createGuidePage,
  listGuides,
  showGuide,
  editGuidePage,
  editGuide,
  deleteGuide,
};

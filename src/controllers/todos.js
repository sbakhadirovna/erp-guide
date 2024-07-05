const { usersDb, guideDb, todosDb } = require("../db");
const createTodoPage = (req, res) => {
  const users = usersDb.findAll();
  const guides = guideDb.findGuide();
  req.session.returnTo="/todos/create"
  res.render("todos/create", { users, guides });
};
const createTodo = (req, res) => {
  const { user_id, guide_id } = req.body;
  console.log(req.body);

  const user = usersDb.findById(user_id);
  if (!user) {
    console.log("user not found");
    return res.status(404).send("user not found");
  }

  const guide = guideDb.findById(guide_id);
  if (!guide) {
    console.log("guide not found");
    return res.status(404).send("guide not found");
  }

  todosDb.create({ user_id, guide_id, completed: false });
  req.flash('success','todo successfully created')
  res.redirect("/todos/list");
};
const listTodos = (req, res) => {
  // console.log("point",req.user); 
  const todos = todosDb.findAllOfUser(req.user.id);
  const users = usersDb.findAll();
  const guides = guideDb.findGuide();

  let usersMap = new Map(users.map((user) => [user.id, user]));
  let guideMap = new Map(guides.map((guide) => [guide.id, guide]));

  todos.forEach((todo) => {
    todo.user = usersMap.get(todo.user_id);
    todo.guide = guideMap.get(todo.guide_id);
  });
  res.render("todos/list", { todos });
};
const showTodo = (req, res) => {
  const { id } = req.params;
  const todo = todosDb.findById(id);
  if (!todo) {
    req.flash("warning","todo not found")
    return res.redirect("/todos/list");
  }
  if (todo.user_id!== req.user.id) {
    console.log("not allowed");
    return res.status(403).send("not allowed")
  }
  todo.user = usersDb.findById(todo.user_id);
  todo.guide = guideDb.findById(todo.guide_id);
  console.log(todo);
  res.render("todos/show", { todo });
};
const completeTodo = (req, res) => {
  const { id } = req.params;
  const todo = todosDb.findById(id);
  if (!todo) {
    req.flash("error","todo not found")
    return res.redirect("/todos/list");
  }
  if (todo.completed) {
    console.log("todo already completed");
    return res.status(400).send("todo already completed");
  }
  if (todo.user_id!== req.user.id) {
    console.log("not allowed");
    return res.status(403).send("not allowed")
  }
  todosDb.update(id, { completed: true });
  req.flash("success",'todo successfully completed')
  res.redirect(`/todos/list`);
};
const deleteTodo = (req, res) => {
  const { id } = req.params;
  const todo = todosDb.findById(id);
  if (!todo) {
    req.flash("error","todo not found")
    return res.redirect("/todos/list");
  }
  todosDb.remove(id);
  guideDb.removeAllOfGuide(id)
  req.flash("success",'todo successfully deleted')
  res.redirect("/todos/list");
};

module.exports = {
  createTodo,
  createTodoPage,
  listTodos,
  showTodo,
  completeTodo,
  deleteTodo,
};

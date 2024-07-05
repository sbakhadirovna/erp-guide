const express = require("express");
const {
  createTodo,
  createTodoPage,
  listTodos,
  showTodo,
  completeTodo,
  deleteTodo,
} = require("../controllers/todos");
const isLoggedIn = require("../shared/middleware/is-loggid-in");
const hasRole = require("../shared/middleware/has-role");
const validate = require("../shared/middleware/validate");
const { createTodoScema } = require("../schemas/todo");

const router = express.Router();
router.use((req,res,next)=>{
  res.locals.page="todos";
  next();
})

router.get("/todos/create", isLoggedIn,hasRole(['admin']), createTodoPage);
router.post("/todos/create", isLoggedIn,hasRole(['admin']),validate(createTodoScema), createTodo);
router.get("/todos/list", isLoggedIn, listTodos);
router.get("/todos/:id", isLoggedIn, showTodo);
router.post("/todos/:id/complete", isLoggedIn, completeTodo);
router.post("/todos/:id/delete",isLoggedIn,hasRole(['admin']),  deleteTodo);

module.exports = router;

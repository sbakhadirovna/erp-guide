const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const todosPath = path.join(__dirname, "..", "..", "db", "todos.json");

const findTodo = () => {
  const todos = fs.readFileSync(todosPath, "utf8");
  const parsed = JSON.parse(todos);
  return parsed;
};
const findAllOfUser = (user_id) => {
  const content = fs.readFileSync(todosPath, "utf8");
  const todos = JSON.parse(content);
  return todos.filter((todo) => todo.user_id === user_id);
};

const create = (data) => {
  const todos = findTodo();
  const newTodo = { id: uuid.v4(), ...data };
  todos.push(newTodo);
  fs.writeFileSync(todosPath, JSON.stringify(todos, null, 2));
  return newTodo;
};

const createBulk = (data) => {
  const todos = findTodo();
  const newTodos = data.map((todo) => ({ id: uuid.v4(), ...todo }));
  todos.push(...newTodos);
  fs.writeFileSync(todosPath, JSON.stringify(todos, null, 2));
  return true;
};

const findById = (id) => {
  const todos = findTodo();
  let result = todos.find((todo) => todo.id === id);
  return (result = result ? result : null);
};
const findByTitle = (title) => {
  const todos = findTodo();
  const todo = todos.find((todo) => todo.title === title);
  return todo ? todo : null;
};

const update = (id, newData) => {
  const todos = findTodo();
  const existing = todos.find((todo) => todo.id === id);
  const index = todos.indexOf(existing);
  todos.splice(index, 1, { ...existing, ...newData });
  fs.writeFileSync(todosPath, JSON.stringify(todos, null, 2));
  return true;
};
const remove = (id) => {
  const todos = findTodo();
  let result = todos.filter((todo) => todo.id !== id);
  const data = JSON.stringify(result, null, 2);
  fs.writeFileSync(todosPath, data, "utf8");
  return true;
};

const removeAllOfUser = (user_id) => {
  const todos = findTodo();
  let result = todos.filter((todo) => todo.user_id !== user_id);
  const data = JSON.stringify(result, null, 2);
  fs.writeFileSync(todosPath, data, "utf8");
  return true;
};

const removeAllOfGuide = (guide_id) => {
  const todos = findTodo();
  let result = todos.filter((todo) => todo.guide_id !== guide_id);
  const data = JSON.stringify(result, null, 2);
  fs.writeFileSync(todosPath, data, "utf8");
  return true;
};

module.exports = {
  findTodo,
  update,
  create,
  createBulk,
  remove,
  findByTitle,
  findById,
  findAllOfUser,
  removeAllOfUser,
  removeAllOfGuide,
};

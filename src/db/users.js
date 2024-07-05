const fs = require("fs");
const { result, forEach } = require("lodash");
const path = require("path");
const uuid = require("uuid");



const dbPath = path.join(__dirname, "..", "..", "db", "users.json");

const findAll = () => {
  const Users = fs.readFileSync(dbPath, "utf8");
  const parsed = JSON.parse(Users);
  return parsed;
};

const create = (data) => {
  const users=findAll()
  const newUser={ id: uuid.v4(), ...data }
  users.push(newUser);
  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
  return newUser;
};
// console.log(create({name:"John",age:33}));



const findById = (id) => {
  const users=findAll()
  let result = users.find((user) => user.id === id);
  return result = result ? result : null;
};
const findByUsername = (username) => {
    const users=findAll()
    const user = users.find((user) => user.username === username);
    return user ? user : null;
  };
  
const update = (id, newData) => {
  const users=findAll()
  let result = users.find((user) => user.id === id);
  const user=users.indexOf(result)
  users.splice(user,1,{...result,...newData})
    fs.writeFileSync(dbPath, JSON.stringify(users,null,2));

    return true;
  
};


const remove = (id) => {
  const users=findAll()
  let result = users.filter((user) => user.id !== id);
  const data = JSON.stringify(result, null, 2);
  fs.writeFileSync(dbPath, data, "utf8");
  return true;
};

module.exports ={findAll,update,create,findById, remove,findByUsername};

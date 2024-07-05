const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const guidePath = path.join(__dirname, "..", "..", "db", "guide.json");

const findGuide = () => {
  const Guides = fs.readFileSync(guidePath, "utf8");
  const parsed = JSON.parse(Guides);
  return parsed;
};

const create = (data) => {
  const guides = findGuide();
  const newGuide = { id: uuid.v4(), ...data };
  guides.push(newGuide);
  fs.writeFileSync(guidePath, JSON.stringify(guides, null, 2));
  return newGuide;
};

const findById = (id) => {
  const guides = findGuide();
  let result = guides.find((guide) => guide.id === id);
  return (result = result ? result : null);
};
const findByTitle = (title) => {
  const guides = findGuide();
  const guide = guides.find((guide) => guide.title === title);
  return guide ? guide : null;
};

const update = (id, newData) => {
  const guides = findGuide();
  let result = guides.find((guide) => guide.id === id);
  const index=guides.indexOf(result)
  guides.splice(index,1,{...result,...newData})
  fs.writeFileSync(guidePath,JSON.stringify(guides,null,2))
  return true;
};

const remove = (id) => {
  const guides = findGuide();
  let result = guides.filter((guide) => guide.id !== id);
  const data = JSON.stringify(result, null, 2);
  fs.writeFileSync(guidePath, data, "utf8");
  return true;
};

module.exports = { 
  findGuide,
  update, 
  create, 
  remove, 
  findByTitle, 
  findById };

const express = require("express");
const {
  createGuide,
  createGuidePage,
  listGuides,
  showGuide,
  editGuidePage,
  editGuide,
  deleteGuide,
} = require("../controllers/guides");
const isLoggedIn = require("../shared/middleware/is-loggid-in");
const hasRole = require("../shared/middleware/has-role");
const validate = require("../shared/middleware/validate");
const { createGuideSchema,editGuideSchema } = require("../schemas/guides");

const router = express.Router();

router.use((req,res,next)=>{
  res.locals.page="guides";
  next();
})

router.get("/guides/create", isLoggedIn,hasRole(['admin']), createGuidePage);
router.post("/guides/create", isLoggedIn,hasRole(['admin']),validate(createGuideSchema),createGuide);
router.get("/guides/list", isLoggedIn, listGuides);
router.get("/guides/:id", isLoggedIn, showGuide);
router.get("/guides/:id/edit", isLoggedIn,hasRole(['admin']), editGuidePage);
router.post("/guides/:id/edit", isLoggedIn,hasRole(['admin']), validate(editGuideSchema),editGuide);
router.post("/guides/:id/delete", isLoggedIn,hasRole(['admin']), deleteGuide);

module.exports = router;

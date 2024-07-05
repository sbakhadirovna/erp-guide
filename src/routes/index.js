const express = require("express");

const todoRoutes = require("./todos");
const usersRoutes = require("./users");
const guidesRoutes = require("./guides");
const authRoutes = require("./auth");
// const dashboardRoutes=require("./dashboard")

const router = express.Router();

router.use(todoRoutes);
router.use(guidesRoutes);
router.use(usersRoutes);
router.use(authRoutes);
// router.use(dashboardRoutes)

module.exports = router;

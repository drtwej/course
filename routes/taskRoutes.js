const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController");

router.post("/create", TaskController.createTask);
router.post("/delete/:id", TaskController.deleteTask);

module.exports = router;

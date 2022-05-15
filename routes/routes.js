const { create } = require("domain");
const express = require("express");
const router = express.Router();
const {
    getAllTasks,
    postTask,
    getTask,
    updateTask,
    deleteTask,
    pageNotFound,
} = require("../cotrollers/controller");

router.route("/api/v1/tasks").get(getAllTasks);
router.route("/api/v1/tasks/post").post(postTask);
router.route("/api/v1/tasks/:id").get(getTask);
router.route("/api/v1/tasks/update/:id").post(updateTask);
router.route("/api/v1/tasks/delete/:id").post(deleteTask);
router.use(pageNotFound);

module.exports = router;
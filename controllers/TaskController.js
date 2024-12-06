const TaskService = require("../services/TaskService");

class TaskController {
  static async createTask(req, res) {
    const { projectId, title, description } = req.body;
    await TaskService.createTask(projectId, title, description);
    res.redirect(`/projects/${projectId}`);
  }

  static async deleteTask(req, res) {
    const { id } = req.params;
    await TaskService.deleteTask(id);
    res.redirect("/projects");
  }
}

module.exports = TaskController;

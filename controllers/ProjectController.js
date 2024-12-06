const ProjectService = require("../services/ProjectService");

class ProjectController {
  static async getProjects(req, res) {
    const projects = await ProjectService.getProjects(req.user.id);
    res.render("dashboard", { projects });
  }

  static async createProject(req, res) {
    const { title, description } = req.body;
    await ProjectService.createProject(req.user.id, title, description);
    res.redirect("/projects");
  }
}

module.exports = ProjectController;

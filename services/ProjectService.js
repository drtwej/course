const ProjectRepository = require("../repositories/ProjectRepository");

class ProjectService {
  static async getProjects(userId) {
    return await ProjectRepository.findProjectsByUser(userId);
  }

  static async createProject(userId, title, description) {
    return await ProjectRepository.createProject(userId, title, description);
  }
}

module.exports = ProjectService;

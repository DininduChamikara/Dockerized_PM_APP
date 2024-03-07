import apiService from "../apiManager";

class ProjectService {
  async create(projectInfo) {
    return await apiService.apiPOST("/projects/create", projectInfo);
  }
  async viewByEmail(email) {
    return await apiService.apiPOST("/projects/view", { email });
  }
  async getById(id) {
    return await apiService.apiGET(`/projects/byId/${id}`);
  }
}

export default new ProjectService();

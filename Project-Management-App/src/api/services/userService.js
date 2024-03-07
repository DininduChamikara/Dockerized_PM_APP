import apiService from "../apiManager";

class UserService {
    async login(userInfo){
        return await apiService.apiPOST("/users/login", userInfo);
    }
    async register(userInfo){
        return await apiService.apiPOST("/users/register", userInfo);
    }
}

export default new UserService();
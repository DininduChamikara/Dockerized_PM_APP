import axios from "axios";

const responseHandling = (response) => {
  const reponseObject = {
    data: response.data,
    status: response.status,
  };
  return reponseObject;
};

const errorHandling = (error) => {
  const { response } = error;
  console.log(response);
};

class ApiService {
  http = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, HEAD, OPTIONS",
    },
  });

  async apiPOST(path, body) {
    const json = JSON.stringify(body);

    const response = await this.http
      .post(path, json)
      .then((response) => responseHandling(response))
      .catch((error) => errorHandling(error));

    return response;
  }

  async apiGET(path) {
    const response = await this.http
      .get(`${path}`)
      .then((response) => responseHandling(response))
      .catch((error) => errorHandling(error));

    return response;
  }
}

export default new ApiService();

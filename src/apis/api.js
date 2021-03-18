import axios from "axios";

const apis = {
  development: "https://git.heroku.com/trippin-ironhack.git",
  production: "https://trippin-ironhack.herokuapp.com",
};

const api = axios.create({
  baseURL: apis[process.env.NODE_ENV],
});

api.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem("loggedInUser");

  const loggedInUser = JSON.parse(storedUser || '""');

  if (loggedInUser.token) {
    config.headers = {
      Authorization: `Bearer ${loggedInUser.token}`,
    };
  }

  return config;
});

export default api;

import axios from "./CustomAxios";

const fetchAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`);
};
const postCreateUser = (name, job) => {
  return axios.post(`/api/users`, { name, job });
};
const updateUser = (name, job, id) => {
  return axios.put(`/api/users/${id}`, { name, job });
};
const deleteUser = (id) => {
  return axios.delete(`/api/users/${id}`);
};
const loginApi = (email, password) => {
  return axios.post(`/api/login`, { email, password });
}
export { fetchAllUser, postCreateUser, updateUser, deleteUser, loginApi };

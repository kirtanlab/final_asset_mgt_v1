import axios from 'axios';
import { getAuthHeader } from 'src/auth/context/jwt/utils';
import { HOST_ADDRESS } from './host';

export async function getAllTypes() {
  return axios.get(`${HOST_ADDRESS}/type/`, getAuthHeader()).then((res) => res.data);
}
export async function createNewType(typeData) {
  return axios
    .post(`${HOST_ADDRESS}/type/Createtype`, typeData, getAuthHeader())
    .then((res) => res.data);
}
export async function updateType(typeData) {
  return axios
    .put(`${HOST_ADDRESS}/type/updateType`, typeData, getAuthHeader())
    .then((res) => res.data);
}
export async function deleteCategoryWithId(categoryId) {
  return axios
    .delete(`${HOST_ADDRESS}/category/${categoryId}`, getAuthHeader())
    .then((res) => res.data);
}
export async function deleteCategoryWithIds(categoryIds) {
  return axios
    .delete(`${HOST_ADDRESS}/category/deleteSelected`, { data: categoryIds }, getAuthHeader())
    .then((res) => res.data);
}

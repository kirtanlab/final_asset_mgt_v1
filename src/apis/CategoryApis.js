import axios from 'axios';
import { getAuthHeader } from 'src/auth/context/jwt/utils';
import { HOST_ADDRESS } from './host';

export async function getAllCategories() {
  return axios.get(`${HOST_ADDRESS}/category/`, getAuthHeader()).then((res) => res.data);
}
export async function createNewCategory(categoryData) {
  return axios
    .post(`${HOST_ADDRESS}/category/CreateCategory/`, categoryData, getAuthHeader())
    .then((res) => res.data);
}
export async function updateCategory(categoryData) {
  return axios
    .put(`${HOST_ADDRESS}/category/updateCategory`, categoryData, getAuthHeader())
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

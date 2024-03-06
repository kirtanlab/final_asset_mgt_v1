import axios from 'axios';
import { getAuthHeader } from 'src/auth/context/jwt/utils';

const BACKEND_CALL_URL = 'http://localhost:8080/api/v1';

export async function getAllCategories() {
  return axios.get(`${BACKEND_CALL_URL}/category/`, getAuthHeader()).then((res) => res.data);
}
export async function createNewCategory(categoryData) {
  return axios
    .post(`${BACKEND_CALL_URL}/category/CreateCategory/`, categoryData, getAuthHeader())
    .then((res) => res.data);
}
export async function updateCategory(categoryData) {
  return axios
    .put(`${BACKEND_CALL_URL}/category/updateCategory`, categoryData, getAuthHeader())
    .then((res) => res.data);
}
export async function deleteCategoryWithId(categoryId) {
  return axios
    .delete(`${BACKEND_CALL_URL}/category/${categoryId}`, getAuthHeader())
    .then((res) => res.data);
}
export async function deleteCategoryWithIds(categoryIds) {
  return axios
    .delete(`${BACKEND_CALL_URL}/category/deleteSelected`, { data: categoryIds }, getAuthHeader())
    .then((res) => res.data);
}

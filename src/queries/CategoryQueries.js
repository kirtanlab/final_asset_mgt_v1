import axios from 'axios';

const BACKEND_CALL_URL = 'http://localhost:8080/api/v1';
export async function getAllCategories() {
  return axios.get(`${BACKEND_CALL_URL}/category/`).then((res) => res.data);
}

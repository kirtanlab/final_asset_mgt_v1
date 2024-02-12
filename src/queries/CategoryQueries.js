import axios from 'axios';

const BACKEND_CALL_URL = 'http://localhost:8080';
export async function getAllCategories() {
  console.log('getting called', BACKEND_CALL_URL);
  return axios.get(`${BACKEND_CALL_URL}/category`).then((res) => res.data());
}

import axios from 'axios';

const BACKEND_CALL_URL = 'http://localhost:8080/api/v1';

export async function getAllEmployee() {
  return axios.get(`${BACKEND_CALL_URL}/employee/`).then((res) => res.data);
}
export async function createNewEmployee(employeeData) {
  return axios
    .post(`${BACKEND_CALL_URL}/employee/createEmployee/`, employeeData)
    .then((res) => res.data);
}
export async function updateEmployee(employeeData) {
  return axios
    .put(`${BACKEND_CALL_URL}/employee/updateEmployee`, employeeData)
    .then((res) => res.data);
}
export async function deleteEmployeeWithId(employeeId) {
  return axios.delete(`${BACKEND_CALL_URL}/employee/${employeeId}`).then((res) => res.data);
}
export async function deleteEmployeeWithIds(employeeIds) {
  return axios
    .delete(`${BACKEND_CALL_URL}/employee/deleteSelected`, { data: employeeIds })
    .then((res) => res.data);
}

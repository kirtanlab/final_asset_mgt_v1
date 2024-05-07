import axios from 'axios';
import { getAuthHeader } from 'src/auth/context/jwt/utils';
import { HOST_ADDRESS } from './host';

export async function testEmployee() {
  return axios.get(`${HOST_ADDRESS}/employee/test/`, getAuthHeader()).then((res) => res.data);
}

export async function getAllEmployee() {
  return axios.get(`${HOST_ADDRESS}/employee/`, getAuthHeader()).then((res) => {
    console.log('employees data', res);
    return res.data;
  });
}
export async function createNewEmployee(employeeData) {
  return axios
    .post(`${HOST_ADDRESS}/employee/CreateEmployee/`, employeeData, getAuthHeader())
    .then((res) => res.data);
}
export async function updateEmployee(employeeData) {
  return axios
    .put(`${HOST_ADDRESS}/employee/updateEmployee`, employeeData, getAuthHeader())
    .then((res) => res.data);
}
export async function deleteEmployeeWithId(employeeId) {
  return axios
    .delete(`${HOST_ADDRESS}/employee/${employeeId}`, getAuthHeader())
    .then((res) => res.data);
}
export async function deleteEmployeeWithIds(employeeIds) {
  return axios
    .delete(`${HOST_ADDRESS}/employee/deleteSelected`, { data: employeeIds }, getAuthHeader())
    .then((res) => res.data);
}

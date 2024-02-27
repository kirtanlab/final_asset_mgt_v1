import axios from 'axios';

const BACKEND_CALL_URL = 'http://localhost:8080/api/v1';
export async function CustomAxios(method, endpoint, data, id) {
  const token = '';
  const config = {
    method,
    url: `${BACKEND_CALL_URL}/${endpoint}`,
    Authorization: `Bearer ${token}`,
  };

  if (data) {
    config.data = data;
  } else if (id) {
    config.url += `/${id}`;
  }

  return axios(config).then((response) => response.data);
}
export async function EmployeeLogin(employeeData) {
  const obj = {
    employeeCode: employeeData.email,
    password: employeeData.password,
  };
  return axios.post(`${BACKEND_CALL_URL}/employee/login`, obj).then((response) => response.data);
}

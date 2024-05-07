import axios from 'axios';
import { HOST_ADDRESS } from 'src/apis/host';

export async function CustomAxios(method, endpoint, data, id) {
  const token = '';
  const config = {
    method,
    url: `${HOST_ADDRESS}/${endpoint}`,
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
  return axios.post(`${HOST_ADDRESS}/employee/login`, obj).then((response) => response.data);
}

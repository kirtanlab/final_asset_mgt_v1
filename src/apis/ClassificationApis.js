import axios from 'axios';
import { getAuthHeader } from 'src/auth/context/jwt/utils';
import { HOST_ADDRESS } from './host';

export async function getAllClassification() {
  return axios.get(`${HOST_ADDRESS}/classification/`, getAuthHeader()).then((res) => res.data);
}
export async function createNewClassification(classData) {
  return axios
    .post(`${HOST_ADDRESS}/classification/CreateClassification`, classData, getAuthHeader())
    .then((res) => res.data);
}
export async function updateClassification(classData) {
  return axios
    .put(`${HOST_ADDRESS}/classification/updateClassification`, classData, getAuthHeader())
    .then((res) => res.data);
}
export async function deleteClassificationWithId(classId) {
  return axios
    .delete(`${HOST_ADDRESS}/classification/${classId}`, getAuthHeader())
    .then((res) => res.data);
}
export async function deleteClassificationWithIds(classIds) {
  return axios
    .delete(`${HOST_ADDRESS}/classification/deleteSelected`, { data: classIds }, getAuthHeader())
    .then((res) => res.data);
}

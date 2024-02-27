import axios from 'axios';
import { getAuthHeader } from 'src/auth/context/jwt/utils';

const BACKEND_CALL_URL = 'http://localhost:8080/api/v1';

export async function getAllLocations() {
  return axios.get(`${BACKEND_CALL_URL}/location/`,getAuthHeader()).then((res) => res.data);
}
export async function createNewLocation(locationData) {
  return axios
    .post(`${BACKEND_CALL_URL}/location/createLocation/`, locationData)
    .then((res) => res.data);
}
export async function updateLocation(locationData) {
  return axios
    .put(`${BACKEND_CALL_URL}/location/updateEmployee`, locationData)
    .then((res) => res.data);
}
export async function deleteLocationWithId(locationId) {
  return axios.delete(`${BACKEND_CALL_URL}/location/${locationId}`).then((res) => res.data);
}
export async function deleteLocationsWithIds(locationIds) {
  return axios
    .delete(`${BACKEND_CALL_URL}/location/deleteSelected`, { data: locationIds })
    .then((res) => res.data);
}

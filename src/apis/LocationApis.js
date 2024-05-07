import axios from 'axios';
import { getAuthHeader } from 'src/auth/context/jwt/utils';
import { HOST_ADDRESS } from './host';

export async function getAllLocations() {
  return axios.get(`${HOST_ADDRESS}/location/`, getAuthHeader()).then((res) => res.data);
}
export async function createNewLocation(locationData) {
  console.log(locationData);
  return axios
    .post(`${HOST_ADDRESS}/location/CreateLocation/`, locationData, getAuthHeader())
    .then((res) => res.data);
}
export async function updateLocation(locationData) {
  return axios
    .put(`${HOST_ADDRESS}/location/updateLocation`, locationData, getAuthHeader())
    .then((res) => res.data);
}
export async function deleteLocationWithId(locationId) {
  return axios
    .delete(`${HOST_ADDRESS}/location/${locationId}`, getAuthHeader())
    .then((res) => res.data);
}
export async function deleteLocationsWithIds(locationIds) {
  return axios
    .delete(`${HOST_ADDRESS}/location/deleteSelected`, { data: locationIds }, getAuthHeader())
    .then((res) => res.data);
}

import { getSession } from "src/auth/context/jwt/utils";



export const config = async () =>{
  const token = await sessionStorage.getItem('accessToken');
  const header = {
 headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  return header;
  };
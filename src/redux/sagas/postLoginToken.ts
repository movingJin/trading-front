import axios from '@utils/axios';

export const postLoginToken = async (idToken: string) => {
  const path = 'user-service/oauth/login';
  const res = await axios.post(path, idToken);

  const status = String(res.data.status);
  const email = String(res.data.email);
  const name = String(res.data.name);
  const password = String(res.data.password);
  const userInfo = {status, email, name, password};
  
  return {"rc": res.status, "userInfo": userInfo};
};

export const createOauthUser = async (userInfo: any) => {
  const path = 'user-service/oauth/create';
  const res = await axios.post(path, userInfo);

  return res.status;
};
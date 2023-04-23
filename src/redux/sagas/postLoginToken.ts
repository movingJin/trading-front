import axios from '@utils/axios';

export const postLoginToken = async (idToken: string) => {
  const path = 'user-service/oauth/login';

  try{
    const res = await axios.post(path, idToken);

    const email = String(res.data.email);
    const name = String(res.data.name);
    const password = String(res.data.password);
    const userInfo = {email, name, password};

    return {"rc": res.status, "userInfo": userInfo};
  } catch (e: any) {
    const email = String(e.response.data.email);
    const name = String(e.response.data.name);
    const password = String(e.response.data.password);
    const userInfo = {email, name, password};

    return {"rc": e.response.status, "userInfo": userInfo};
  }
};

export const createOauthUser = async (userInfo: any) => {
  const path = 'user-service/oauth/create';
  const res = await axios.post(path, userInfo);

  return res.status;
};
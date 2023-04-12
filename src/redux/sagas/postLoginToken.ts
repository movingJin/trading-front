import axios from '@utils/axios';

export const postLoginToken = async (idToken: string) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = 'user-service/oauth/login';

    const res = await axios.post(path, idToken);
    const email = String(res.data.email);
    const password = String(res.data.password);
    const userInfo = {email, password};

    return userInfo;
  };
import React from 'react'
import { loginActions } from '@redux/reducers/authReducer';
import { useDispatch } from 'react-redux';

import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import GoogleLogin from './GoogleLogin';
import Nav from './Nav';
import { postLoginToken } from '../../redux/sagas/postLoginToken';

export default function OauthLogin( {isLogin}: {isLogin: boolean} ) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if(userInfo.email === null || userInfo.email === '') return; 
    dispatch(loginActions.request(userInfo));
  }, [userInfo]);

  useEffect(() => {
    if (isLogin){
      history.push('/main/dashboard');
    }
  }, [isLogin]);

  // https://stackoverflow.com/questions/49819183/react-what-is-the-best-way-to-handle-login-and-authentication
  const onGoogleSignIn = async (res: any) => {
    const { credential } = res;
    const user = await postLoginToken(credential);
    setUserInfo(user);
  };

  return (
    <div>
      <GoogleLogin onGoogleSignIn={onGoogleSignIn} text="로그인" />
    </div>
  );
}
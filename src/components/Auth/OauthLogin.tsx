import React from 'react'
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import GoogleLogin from './GoogleLogin';
import Nav from './Nav';
import { postLoginToken } from '../../redux/sagas/postLoginToken';

export default function OauthLogin( {isLogin, setIsLogin}: {isLogin: boolean, setIsLogin:any} ) {
  const history = useHistory();

  // https://stackoverflow.com/questions/49819183/react-what-is-the-best-way-to-handle-login-and-authentication
  const onGoogleSignIn = async (res: any) => {
    const { credential } = res;
    const result = await postLoginToken(credential);
    setIsLogin(result);
  };

  useEffect(() => {
    if (!isLogin) return;
    history.push('/mypage');
  }, [isLogin]);

  return (
    <div>
      <Nav />
      <GoogleLogin onGoogleSignIn={onGoogleSignIn} text="로그인" />
    </div>
  );
}
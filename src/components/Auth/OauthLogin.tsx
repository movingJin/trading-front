import React from 'react'
import { loginActions } from '@redux/reducers/authReducer';
import { useDispatch } from 'react-redux';

import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import { postLoginToken, createOauthUser } from '../../redux/sagas/postLoginToken';

import GoogleLogin from './GoogleLogin';
import Modal from '../common/Modal';
import {commonMsg} from '../../utils/commonString';

export default function OauthLogin( {isLogin}: {isLogin: boolean} ) {
  
  const history = useHistory();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    email: '',
    name: '',
    password: '',
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  }
  const closeModal = () => {
    setModalOpen(false);
  }
  const [toast, setToast] = useState(false);
  const handleToastOpen = () => setToast(true);
  const handleToastClose = () => {
    setToast(false);
  }

  const submitCreateOauthUser = async () => {
    closeModal();
    const rc = await createOauthUser(userInfo);
    if(rc === 201){
      setAccountCreated(true);
      handleToastOpen();
    }
  }


  useEffect(() => {
    if((!userInfo.email || userInfo.email === 'null') ||(!userInfo.password || userInfo.password === 'null')) return; 
    dispatch(loginActions.request(userInfo));
  }, [userInfo]);

  useEffect(() => {
    if (isLogin){
      history.push('/main/dashboard');
    }
  }, [isLogin]);

  useEffect(() => {

  }, [accountCreated]);

  // https://stackoverflow.com/questions/49819183/react-what-is-the-best-way-to-handle-login-and-authentication
  const onGoogleSignIn = async (res: any) => {
    const { credential } = res;
    const {"rc": status, "userInfo": user} = await postLoginToken(credential);
    setUserInfo(user);
    if(status === 404){
      setModalOpen(true);
    }
  };

  return (
    <div>
      <GoogleLogin onGoogleSignIn={onGoogleSignIn} text="로그인" />
      <Modal open={isModalOpen} close={closeModal} header="회원가입" submit={submitCreateOauthUser}>
        {userInfo.email} 로 가입하겠습니까?? 
      </Modal>
            <Snackbar
              open={toast}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              autoHideDuration={3000}
              onClose={handleToastClose}
              message={accountCreated ? commonMsg.SIGNUP_SUCCESS_MSG: commonMsg.SIGNUP_FAIL_MSG}
            />
    </div>
  );
}
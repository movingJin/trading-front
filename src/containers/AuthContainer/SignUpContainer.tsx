import { signupActions } from '@redux/reducers/authReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SignUp from '../../components/Auth/SignUp';

export interface SignUpContainerProps {
  open: boolean;
  // handleClose: (v: boolean | ((pv: boolean) => boolean)) => void;
  handleClose: () => void;
}

export default function SignUpContainer({
  open,
  handleClose,
}: SignUpContainerProps): JSX.Element {
  const [isPassword, setIsPassword] = React.useState(false);
  const [form, setValues] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    username: '',
    localMsg: '',
  });
  const dispatch = useDispatch();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordConfirm: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = () => {
    const { email, password, passwordConfirm, username } = form;
    if (
      email !== '' &&
      password !== '' &&
      passwordConfirm !== '' &&
      username !== '' &&
      password === passwordConfirm &&
      isPassword === true
    ) {
      setValues({
        ...form,
        localMsg: '',
      });
      const userInfo = { email, password, name: username };
      dispatch(signupActions.request(userInfo));
      handleClose();
    } else if (isPassword && password === passwordConfirm) {
      setValues({
        ...form,
        localMsg: '정보를 다 채워주세요.',
      });
    }
  };

  useEffect(() => {
    const { password, passwordConfirm } = form;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    if(!password || passwordRegex.test(password)){
      if (passwordConfirm === '') {
        setValues({
          ...form,
          localMsg: '',
        });
      } else if (password !== passwordConfirm) {
        setValues({
          ...form,
          localMsg: '비밀번호가 일치하지 않습니다.',
        });
      } else if (password === passwordConfirm) {
        setValues({
          ...form,
          localMsg: '',
        });
      }
       
      setIsPassword(true);
    }else{
      setValues({
        ...form,
        localMsg: 'Password must be at least 8 characters and contain at least one letter and one number.',
      });
      setIsPassword(false);
    }



  }, [form.password, form.passwordConfirm]);

  return (
    <SignUp
      open={open}
      handleClose={handleClose}
      handleChange={handleChange}
      handlePasswordConfirm={handlePasswordConfirm}
      handleSignUp={handleSignUp}
      localMsg={form.localMsg}
    />
  );
}

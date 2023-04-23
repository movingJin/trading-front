import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import './modal.css';

const ConfirmButton = styled(Button)`
    padding: 6px 12px;
    border-radius: 5px;
    font-size: 13px;
    background-color: #170f8b;
    color: #ffffff;
    width: 5rem;
    margin: 0.5rem 0rem 0rem 0rem;
    &:hover{  
        color : #170f8b
    }
`;

const CancleButton = styled(Button)`
    padding: 6px 12px;
    border-radius: 5px;
    font-size: 13px;
    background-color: #aaaaaa;
    color: #ffffff;
    width: 5rem;
    margin: 0.5rem 0rem 0rem 0.5rem;
    &:hover{  
        color : #aaaaaa
    }
`;

export interface ModalProps {
    open: boolean;
    close: () => void;
    header: string;
    children: React.ReactNode;
    submit: () => void;
}

export default function Modal(props: ModalProps) {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, children, submit } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <Box sx={{ padding: 1 }}>
            {header}
          </Box>
          <main>{children}</main>
          <footer>
            <ConfirmButton onClick={submit}>
              Ok
            </ConfirmButton>
            <CancleButton onClick={close}>
              Cancel
            </CancleButton>
          </footer>
        </section>
      ) : null}
    </div>
  );
};
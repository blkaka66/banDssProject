import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { useToast } from '@chakra-ui/react'; // Chakra UI의 useToast 가져오기
import { Button } from '@mui/material';

interface SendMailProps {
  ref: React.RefObject<HTMLFormElement>;
}

const SERVICE_ID = "service_aklg3zc"
const TEMPLATE_ID = "template_bokbo3q"
const PUBLIC_KEY = "tccwNrucRC4S0gI4w"

const SendMail: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const toast = useToast(); // useToast 훅 사용

  const [storeName, setStoreName] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoreName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    try {
      const response =await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      toast({
        title: '메일이 전송되었습니다.',
        status: 'success',
        position: 'top-right',
        duration: 2000,
        isClosable: true,
      });
      console.log(response)
    } catch (error) {
      console.error('Failed to send email:', error);
      toast({
        title: '메일 전송에 실패했습니다.',
        status: 'error',
        position: 'top-right',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <h1>문의사항</h1>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="to_name">상호명</label>
          <input type="text" id="to_name" name="to_name" value={storeName} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="user_email">답변 받으실 이메일을 작성해 주세요.</label>
          <input type="email" id="user_email" name="user_email" />
        </div>
        <div>
          <label>문의하실 내용을 작성해 주세요.</label>
          <textarea id="message" name="message" />
        </div>
        <Button type="submit">보내기</Button>
      </form>
    </div>
  );
};

export default SendMail;

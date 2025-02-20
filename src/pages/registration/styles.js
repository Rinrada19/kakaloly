// styles.js
import styled from 'styled-components';

// สไตล์ที่ใช้ซ้ำ
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100vh;
  background-color: #f9f4ee;
`;

export const Title = styled.h1` 
  text-align: center;
  font-size: 24px;
  letter-spacing: 1px;
  font-weight: 600;
  color: #915B43;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  background-color: #4A8854;
  color: white;
  letter-spacing: 1px;
  border: none;
  width: 173px;
  height: 46px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    background-color: #3e7649;
  }
    
`;

export const Image = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  margin-bottom: 30px;
`;
export const Input = styled.input`
  width: 267px;
  height: 40px;
  border: 1px solid #915B43;
  border-radius: 50px;
  padding: 5px 10px;
  font-size: 16px;
  color: #915B43;
  text-align: center;

  &:focus {
    outline: none;
    border-color: #FF7F32;
  }
`;
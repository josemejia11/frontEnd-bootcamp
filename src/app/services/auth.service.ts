import { nanoid } from 'nanoid';

export const getAuthToken = () => {
  let token = window.localStorage.getItem('token');
  if (!token) {
    token = nanoid();
    window.localStorage.setItem('token', token);
  }
  return token;
};

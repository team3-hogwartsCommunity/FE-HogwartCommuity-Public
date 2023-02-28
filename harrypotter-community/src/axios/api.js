import { getConfig } from "@testing-library/react";
import axios from "axios";

const instance = axios.create({
  baseURL: 'http://52.79.148.222:8080'}
)
instance.interceptors.response.use(
  function (response) {
    const token = response.headers.authorization.split(' ')
    console.log(token[1])
    localStorage.setItem('Access_Token', token[1])
    console.log(localStorage.getItem('Access_Token'))
    return response;
  }
)

// 회원가입 api
export async function SignUpData(userInfo) {
  const { data } = await instance.post('api/user/signup', userInfo)
  return data
}

// 로그인 api
export async function LoginData(userInfo) {
  const { data } = await instance.post('/api/user/login', userInfo)
  console.log('data')
  return data
}

// { withCredentials: true }
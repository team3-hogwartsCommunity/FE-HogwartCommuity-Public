import axios from "axios";

const instance = axios.create({
  baseURL: 'http://52.79.148.222:8080'
})

// 회원가입 api
export async function SignUpData(userInfo) {
  const { data } = await instance.post('api/user/signup', userInfo)
  return data
}

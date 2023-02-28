import { Cookies } from 'react-cookie'

const cookies = new Cookies();

// 쿠키 저장 함수
export const setCookies = (name, value, option) => {
  return cookies.set(name, value, {...option});
}

// 쿠키 꺼내어 사용할 함수
export const getCookies = (name, value, option) => {
  return cookies.get(name, value, {...option});
}

// 쿠키 삭제 함수
export const removeCookies = (name, value, option) => {
  return cookies.remove(name, value, {...option});
}
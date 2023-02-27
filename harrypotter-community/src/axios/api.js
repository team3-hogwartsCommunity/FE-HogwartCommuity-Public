
import axios from "axios";

const instance = axios.create({
  baseURL: 'http://52.79.148.222:8080'
})

// 회원가입 api
export async function SignUpData(userInfo) {
  const { data } = await instance.post('api/user/signup', userInfo)
  return data
}
export const getBoard = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/boards?dormitory=Gryffindor`)
    return response
}


// 트러블슈팅 
// 특정 id값 유동적으로 받아오는 방법
// 새로고침 해야 이전 페이지 데이터가 정상적으로 불러와지는 문제

export const getSingleBoard = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/board?id=2`)
    return response
}

export const addBoard = async (newBoard) => {
    console.log(newBoard)
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/board`, newBoard)
}

export const addComment = async (newComment) => {
    console.log("newComment :" ,newComment)
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/board/${newComment.id}/comment`, {contents:newComment.comment})
}

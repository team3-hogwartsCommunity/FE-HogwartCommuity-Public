import axios from "axios";

const token = localStorage.getItem('Access_Token')

export const instance = axios.create({
  baseURL: 'http://52.79.148.222:8080',
  // headers: { Authorization : token },
  withCredentials: true
})

instance.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem('Access_Token');
    config.headers.Authorization = token;
    return config
  }
)
instance.interceptors.response.use(
  function (response) {
    console.log(response)
    const token = response.headers.authorization
    if (token) {
      const _token = token.split(' ')
      console.log(_token[1])
      localStorage.setItem('Access_Token', _token[1])
      console.log(localStorage.getItem('Access_Token'))
    }
    return response;
  }
)

// 회원가입 api
export async function SignUpData(userInfo) {
  const { data } = await instance.post('api/user/signup', userInfo)
  console.log(data)
  return data
}


// 로그인 api
export async function LoginData(userInfo) {
  const data = await instance.post('/api/user/login', userInfo)
  const apiToken = data.headers.get('authorization')
  console.log('data', apiToken)
  return data
}

// 특정 기숙사 전체 게시글 가져오기
export const getBoard = async () => {
    const response = await instance.get(`/api/boards?dormitory=Gryffindor&page=0&size=8`)
    return response
}

export const addBoard = async (newBoard) => {
  console.log(newBoard)
  await instance.post(`/api/board`, newBoard)
}

export const deleteBoard = async (boardId) => {
  await instance.delete(`/api/board/${boardId}`)
}

// 트러블슈팅 
// 특정 id값 유동적으로 받아오는 방법 -> 해결
// 새로고침 해야 이전 페이지 데이터가 정상적으로 불러와지는 문제 -> 해결

export const getSingleBoard = async (paramId) => {
    const response = await instance.get(`/api/board?id=${paramId}`)
    return response
}



export const addComment = async (newComment) => {
    console.log("newComment :" ,newComment)
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/board/${newComment.id}/comment`, {contents:newComment.comment})
}

export const deleteComment = async ({boardId, commentId}) => {
    console.log("boardId:" , boardId, "commentId:"  , commentId)
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/board/${boardId}/comment/${commentId}`)
}

import axios from "axios"






export const getBoard = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
    // 게시판 배열 길이 계산을 위해 원본을 보내 줘야 함
    return response
}
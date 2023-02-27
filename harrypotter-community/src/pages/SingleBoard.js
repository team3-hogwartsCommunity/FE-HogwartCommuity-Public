import React from 'react'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { getBoard } from '../axios/api'
import Header from '../components/Header'

function SingleBoard() {
    const { isLoading, isError, data } = useQuery(['todos'], getBoard)
    const boardData = data.data

    const params = useParams()

    const todo = boardData.find((element) => String(element.id) === params.id)


  return (
   <>
    
    <div>
        <p>id : {todo.id}</p>
        <div>title : {todo.title}</div>
        <p>User ID : {todo.userId}</p>
        <Link to={'/' }><button>이전으로</button></Link>
        <div>
          댓글 영역
        </div>

    </div>
   </>
  )
}

export default SingleBoard
import React from 'react'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getBoard } from '../axios/api'
import Header from '../components/Header'

const SingleBoardContainer = styled.div`
  width: 1500px;
  height: auto;
  border: 1px solid black;
  margin: 50px auto;
  
`


const SingleBoardTitle = styled.p`
  height: 50px;
`
const SingleBoardContent = styled.div`
  margin-top: 20px;
  width: 100%;
  
  border: 1px solid red;
  border-radius: 3%;
`

const CommentContainer = styled.div`
  width: 1500px;
  height: auto;
  margin: 50px auto;
  

`
const SingleComment = styled.div`
  margin-bottom: 10px;
`
const AddCommentContainer = styled.div`
  border: 1px solid red;
  position: relative;
`
const AddCommentArea = styled.textarea`
  width: 1000px;
  height: 80px;
  padding: 12px;
  border: 1px solid black;
  background: #fff;
`
const AddCommentButtonContainer = styled.div`

`
function SingleBoard() {
  const { isLoading, isError, data } = useQuery(['todos'], getBoard)
  const params = useParams()
  if (isLoading) {
    return <h1>로딩중...</h1>
  }
  if (isError) {
    return <h1>Error...</h1>
  }
  const boardData = data.data



  const todo = boardData.find((element) => String(element.id) === params.id)


  return (
    <>

      <SingleBoardContainer>
        {/* 좋아요, 글id, 글 제목/내용, 생성시간, 댓글 */}
        <SingleBoardTitle>
          {/* 글 제목 영역 */}
          <h3 style={{}}>글 제목</h3>
        </SingleBoardTitle>

        <SingleBoardContent>
          {/* 글 내용 영역 */}
          <h3>글 내용이 옴</h3>
          
        </SingleBoardContent>
      </SingleBoardContainer>
      <CommentContainer>
        <SingleComment>닉네임: 댓글내용 1</SingleComment>
        <SingleComment>닉네임: 댓글내용 2</SingleComment>
        <SingleComment>닉네임: 댓글내용 3</SingleComment>
        <AddCommentContainer>
          <AddCommentArea></AddCommentArea>
          <AddCommentButtonContainer>
            <button>등록</button>
          </AddCommentButtonContainer>
        </AddCommentContainer>
      </CommentContainer>
    </>
  )
}

export default SingleBoard
import jwtDecode from 'jwt-decode'
import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { addComment, deleteBoard, deleteComment, editComment, getSingleBoard, token } from '../axios/api'

import useInput from '../hooks/useInput'

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
const AddCommentTextArea = styled.textarea`
  width: 1000px;
  height: 80px;
  padding: 12px;
  border: 1px solid black;
  background: #fff;
  resize: none;
`
const AddCommentButtonContainer = styled.div`

`
function SingleBoard() {
  const params = useParams()
  console.log(params)
  const { isLoading, isError, data } = useQuery(['board', params.id], () => getSingleBoard(params.id))
  const [comment, onChangeComment, resetComment] = useInput();
  const [newComment, onChangeNewComment, resetNewComment] = useInput();
  const [commentId, setCommentId] = useState(0);
  const [visible, setVisible] = useState(false)

  const queryClient = useQueryClient()

  const deleteBoardMutation = useMutation(deleteBoard, {
    onSuccess : () => {
      queryClient.invalidateQueries('board')
    }
  })


  const addMutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('board')
    }
  })

  const deleteMutation = useMutation(deleteComment, {
    onSuccess: () =>
      queryClient.invalidateQueries('board')
  })

  const editMutation = useMutation(editComment, {
    onSuccess: () => queryClient.invalidateQueries('board')
  })
  const navigate = useNavigate()
  if (isLoading) {
    return <h1>로딩중...</h1>
  }
  if (isError) {
    return <h1>Error...</h1>
  }
  // const boardData = data.data.find((element) => String(element.id) === params.id)
  // console.log(boardData)
  

  const decoded_token = jwtDecode(token)
  
  const boardData = data.data
  const boardComment = boardData.commentList

  console.log(boardData)
  console.log(decoded_token)

  // console.log(boardComment)



  const onCommentSubmitHandler = (e) => {
    e.preventDefault();
    // 여기서 댓글 등록 및 db에 추가 구현
    addMutation.mutate({
      id: boardData.id,
      comment
    })
    resetComment();
  }

  const onDeleteCommentHandler = (boardId) => {
    deleteMutation.mutate(boardId)
  }
  
  const onDeleteBoardHandler = (boardId) => {
    deleteBoardMutation.mutate(boardId)
  }

  // {boardId,commentId,changeComment}\
  // 댓글 수정 쿼리
  // 
  const onEditCommentHandler = (e) => {
    e.preventDefault();
    editMutation.mutate({
      boardId: boardData.id,
      commentId: commentId, // undefined
      changeComment: newComment
    })
  }
  // decoded_token.sub
  return (
    <>
      
      <SingleBoardContainer>
        {/* 좋아요, 글id, 글 제목/내용, 생성시간, 댓글 */}
        <h3>
          <SingleBoardTitle>
            {/* 글 제목 영역 */}
            {boardData.title}
          </SingleBoardTitle>
        </h3>

        <SingleBoardContent>
          {/* 글 내용 영역 */}
          <h3>{boardData.contents}</h3>

        </SingleBoardContent>
      </SingleBoardContainer>
      <CommentContainer>

        {
          boardComment.map((item) => (
           
              <SingleComment key={item.id}>
                {item.username} : {item.contents}
                {
                  decoded_token.sub === item.username 
                  ? <button onClick={() => { onDeleteCommentHandler({ boardId: params.id, commentId: item.id }) }}>삭제</button> : null
                }
                {
                  decoded_token.sub === item.username 
                  ? 
                  <button onClick={() => { 
                    setVisible(!visible) 
                    setCommentId(item.id)
                    }}>수정</button> : null
                }
              </SingleComment>
              
          
          ))
        }
        {
                visible &&
                <AddCommentContainer>
                  <form onSubmit={onEditCommentHandler}>
                    <AddCommentTextArea onChange={onChangeNewComment} value={newComment} placeholder="수정할 댓글을 입력해주세요"></AddCommentTextArea>
                    <AddCommentButtonContainer>
                      <button>수정하기</button>
                    </AddCommentButtonContainer>
                  </form>
                </AddCommentContainer>
              }
        <AddCommentContainer>
          <form onSubmit={onCommentSubmitHandler}>
            <AddCommentTextArea onChange={onChangeComment} value={comment} placeholder="댓글을 입력해주세요"></AddCommentTextArea>
            <AddCommentButtonContainer>
              <button>등록</button>
            </AddCommentButtonContainer>
          </form>
        </AddCommentContainer>
      </CommentContainer>
      <div>

        {/* 게시글 수정, 삭제 코드 */}
        {/* 권한제어 해뒀음! */}
        {
          decoded_token.sub === boardData.username 
          ? <button><Link to={`/EditPost/${params.id}`}>게시글 수정</Link> </button>
          : null
        }
        {
          decoded_token.sub === boardData.username
          ? <button onClick={
            () => {
              onDeleteBoardHandler(params.id)
              navigate(`/${decoded_token.auth}`)
            }
            }>게시글 삭제</button>
          : null
        }
      </div>
    </>
  )
}

export default SingleBoard
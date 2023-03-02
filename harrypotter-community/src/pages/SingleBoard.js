import jwtDecode from 'jwt-decode'
import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { addComment, deleteBoard, deleteComment, editComment, getSingleBoard, token } from '../axios/api'

import useInput from '../hooks/useInput'


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
    onSuccess: () => {
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
    <Bg>
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
              <CommentRow>
                {item.username} : {item.contents}
                <div>
                  {
                    decoded_token.sub === item.username
                      ? <CommentButton onClick={() => { onDeleteCommentHandler({ boardId: params.id, commentId: item.id }) }}>Delete</CommentButton> : null
                  }
                  {
                    decoded_token.sub === item.username
                      ?
                      <CommentButton onClick={() => {
                        setVisible(!visible)
                        setCommentId(item.id)
                      }}>Edit</CommentButton> : null
                  }
                </div>
              </CommentRow>
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
              <AddCommentButton>ADD⏳</AddCommentButton>
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
    </Bg>
  )
}

const Bg = styled.div`
  height: 100vh;
  padding: 100px;
  background-color: white;
`

const SingleBoardContainer = styled.div`
  width: 1000px;
  max-height: 880px;
  border: 2px solid #D2D2FF;
  box-shadow: 2px 3px 5px 2px #D2D2FF;
  border-radius: 12px;
  margin: 0px auto;
  color: #464646	;
  font-family: 'lightFont';
`
const SingleBoardTitle = styled.p`
  height: 30px;
  padding: 10px;
`
const SingleBoardContent = styled.div`
  margin-top: 20px;
  width: 100%;
  padding: 10px;
  
  border: 1px solid #D2D2FF;
  border-bottom: 0ch;
  border-left: 0ch;
  border-right: 0ch;
  border-radius: 3%;
`
const CommentContainer = styled.div`
  width: 1000px;
  height: auto;
  margin: 50px auto;
`
const CommentRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: #464646;
  font-size: 18px;
  font-family: 'lightFont';
`
const SingleComment = styled.div`
  margin-bottom: 10px;
`
const CommentButton = styled.button`
  margin-right: 5px;
  border-radius: 5px;
  background-color: white;
  font-size: 15px;
  border: 1px solid #828282;
  cursor: pointer;
  color: #464646;
`
const AddCommentContainer = styled.div`
  /* border: 1px solid ; */
  position: relative;
`
const AddCommentTextArea = styled.textarea`
  width: 1000px;
  height: 80px;
  padding: 12px;
  border: 1px solid #b8a0dc;
  background: white;
  resize: none;
  margin-top: 10px;
`
const AddCommentButtonContainer = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: end;
`
const AddCommentButton = styled.button`
  border-radius: 5px;
  background-color: #464646;
  color: white;
  font-size: 20px;
  font-family: 'lightFont';
  box-shadow: 1px 2px 2px 2px #b8a0dc;
`

export default SingleBoard
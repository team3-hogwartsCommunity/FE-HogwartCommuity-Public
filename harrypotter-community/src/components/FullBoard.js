import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteBoard, getGryffindorBoard } from '../axios/api';
import 'bootstrap/dist/css/bootstrap.css'
import './boardPaging.css'
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';

// const BoardContainer = styled.div`
//     display: flex;
//     flex-direction: row;
//     flex-wrap: wrap;
//     height: 1200px;
//   `

// const BoardItem = styled.div`
//   width: 700px;
//   height: 40%;
//   margin-top: 50px;
//   margin-left: 70px;
//   margin-right: 70px;
//   background-color: white;
//   border: 1px solid black;
// `

// 테이블 구현


function FullBoard() {

  const [currentPage, setCurrentPage] = useState(1);
  // const [title, onChangeTitle, resetTitle] = useInput();
  // const [contents, onChangeContents, resetContents] = useInput();
  // const [dormitory, onChangeDormitory, resetDormitory] = useInput();
  const queryClient = useQueryClient()
  const { isLoading, isError, data } = useQuery(
    ['board', currentPage-1],
    () => getGryffindorBoard(currentPage-1),
    {keepPreviousData:true}
    )

  // const addMutation = useMutation(addBoard,{
  //   onSuccess : () => {
  //     queryClient.invalidateQueries('board')
  //   }
  // })
  const deleteMutation = useMutation(deleteBoard, {
    onSuccess : () =>{
      queryClient.invalidateQueries('board')
    }
  })




  if (isLoading) {
    return <h1>로딩중...</h1>
  }
  if (isError) {
    return <h1>Error...</h1>
  }
  console.log(data)

  

  // 1, 10 , 11, 20, 21, 30
  const boardData = data.data.boardLists.slice((currentPage-1) * 8, (currentPage * 8))
  const paginationHandler = (i) => {
    
    setCurrentPage(i)
  }

  // const addDormBoard = (e) => {
  //   e.preventDefault();
  //   addMutation.mutate({
  //     title,
  //     contents,
  //     dormitory
  //   })
  // }
  const deleteDormBoard = (boardId) => {
    
    deleteMutation.mutate(boardId)
  }
  


  return (
    <>
    <Container>
      <Header />
      {/* <form onSubmit={addDormBoard}> 
        <input type="text" name='title' value={title} onChange={onChangeTitle}/>
        <input type="contents" name='contents' value={contents} onChange={onChangeContents}/>
        <input type="dormitory" name='dormitory' value={dormitory} onChange={onChangeDormitory}/>
        <button type='submit'>추가 테스트</button>
      </form> */}
      <Bg>
      <Wrap>
        {
          boardData.map((item) => (
              <CardContainer border='#e96363'>
              <div key={item.id}>
              <Font size='20px'>{item.title}</Font>
              <Font>{item.contents}</Font>
              </div>
              </CardContainer>
            // {/* <div key={item.id}>
            //   <Font size='20px'>{item.title}</Font>
            //   <Font>{item.contents}</Font>
            //   {/* <button>좋아요</button>
            //   <button>수정</button>
            //   <button onClick={() => {deleteDormBoard(item.id)}}>삭제</button>
            //   <div>
            //   <Link to={`/board/${item.id}`}>보기</Link>
            //   </div> */}
            // </div> */}
          ))
        }
        </Wrap>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={8}
          totalItemsCount={data.data.length}
          pageRangeDisplayed={5}
          prevPageText={"<"}
          nextPageText={">"}
          onChange={paginationHandler}
        
        />
      </Bg>
    </Container>
    </>
  )
}

const Container = styled.div`
  background-color: black;
`
const Bg = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: black;
`
const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 30px 100px;
  gap: 50px;
`
const CardContainer = styled.div`
  width: 300px;
  height: 250px;
  border-radius: 8px;
  border: 1px solid ${({ border }) => border};
  box-shadow: 2px 1px 5px 2px ${({ border }) => border};;
  padding: 20px;
`

const Font = styled.div`
  color: white;
  font-size: ${({ size }) => size};
  font-family: 'lightFont';
`

export default FullBoard
import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteBoard, getGryffindorBoard } from '../axios/api';
import 'bootstrap/dist/css/bootstrap.css'
import './boardPaging.css'
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';



function FullBoard() {

  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient()
  const { isLoading, isError, data } = useQuery(
    ['board', currentPage-1],
    () => getGryffindorBoard(currentPage-1),
    {keepPreviousData:true}
    )

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


  const boardData = data.data.boardLists.slice((currentPage-1) * 8, (currentPage * 8))
  const paginationHandler = (i) => {
    
    setCurrentPage(i)
  }
  const deleteDormBoard = (boardId) => {
    
    deleteMutation.mutate(boardId)
  }
  


  return (
    <>
    <Container>
      <Header />
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
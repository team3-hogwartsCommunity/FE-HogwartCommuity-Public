import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { getBoard } from '../axios/api';
import 'bootstrap/dist/css/bootstrap.css'
import './boardPaging.css'
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BoardContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 1200px;
  `

const BoardItem = styled.div`
  width: 700px;
  height: 40%;
  margin-top: 50px;
  margin-left: 70px;
  margin-right: 70px;
  background-color: white;
  border: 1px solid black;
 

`

// 테이블 구현


function FullBoard() {

  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, isError, data } = useQuery(['todos'],getBoard)


 
  if (isLoading) {
    return <h1>로딩중...</h1>
  }
  if (isError) {
    return <h1>Error...</h1>
  }


  

  // 1, 10 , 11, 20, 21, 30
  const boardData = data.data.slice((currentPage-1) * 8, (currentPage * 8))

  const length =Math.ceil(data.data.length/10)

  const pages = [...Array(length + 1).keys()].slice(1);
  
  const paginationHandler = (i) => {
    
    setCurrentPage(i)
  }
  



  return (
    <>
      
      <div>
        {/* <table className='table'>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            {
              boardData.map((item) => (
                <tr key={item.id}>
                 
                  <td>{item.id}</td>
                  <td><Link to={`/todolist/${item.id}`}>{item.title}</Link></td>
                  <td>{item.userId}</td>
                </tr>
              ))
            }
          </tbody>
        </table> */}
        <BoardContainer>
        {
          boardData.map((item) => (
            <BoardItem key={item.id}>
              <h2>{item.id}</h2>
              <p>{item.title}</p>
              <button>좋아요</button>
              <Link to={`/todolist/${item.id}`}>보기</Link>
            </BoardItem>
          ))
        }
        </BoardContainer>
        {/* 페이지네이션 재구현 */}
        {/* <nav className='d-flex justify-content-center'>
          <ul className='pagination'>
            {
              pages.map(
                page => <li className='page-link'
                onClick={() => paginationHandler(page)}
                key={page}>{page}</li>
              )
            }
          </ul>
        </nav> */}
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={8}
          totalItemsCount={data.data.length}
          pageRangeDisplayed={5}
          prevPageText={"<"}
          nextPageText={">"}
          onChange={paginationHandler}
        
        />
      </div>
    </>

  )
}

export default FullBoard
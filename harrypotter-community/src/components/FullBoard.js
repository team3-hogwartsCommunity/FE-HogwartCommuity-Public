import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query';
import { getBoard } from '../axios/api';
import 'bootstrap/dist/css/bootstrap.css'
import Header from './Header';
import { Link } from 'react-router-dom';


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
  const boardData = data.data.slice((currentPage-1) * 10, (currentPage * 10))

  const length =Math.ceil(data.data.length/10)
  const pages = [...Array(length + 1).keys()].slice(1);
  
  const paginationHandler = (i) => {
    
    setCurrentPage(i)
  }

  return (
    <>
      <Header></Header>
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              {/* 데이터 생기면 글쓴이로 변경 */}
              <th>User Id</th>
            </tr>
          </thead>
          <tbody>
            {
              boardData.map((item) => (
                <tr key={item.id}>
                  {/* 데이터 생기면 이곳 변경해야함 */}
                  <td>{item.id}</td>
                  <td><Link to={`/todolist/${item.id}`}>{item.title}</Link></td>
                  <td>{item.userId}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {/* 페이지네이션 재구현 */}
        <nav className='d-flex justify-content-center'>
          <ul className='pagination'>
            {
              pages.map(
                page => <li className='page-link'
                onClick={() => paginationHandler(page)}
                key={page}>{page}</li>
              )
            }
          </ul>
        </nav>
      </div>
    </>

  )
}

export default FullBoard
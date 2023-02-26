import React, { useMemo } from 'react'
import { useQuery, useQueryClient } from 'react-query';
import { getBoard } from '../axios/api';
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import Header from './Header';


// 테이블 구현


function FullBoard() {
  
  const { isLoading, isError, data } = useQuery(['todos'], getBoard)

  if (isLoading) {
    return <h1>로딩중...</h1>
  }
  if (isError) {
    return <h1>Error...</h1>
  }
  // id, title, completed
  const boardData = data.data


  return (
    <>
      <Header></Header>
      <DataTable value={boardData}
      // 페이지네이션 지원..
      paginator
      // 한번에 몇개씩 보여질지 설정
      rows={10}
      // 한번에 최대 몇개까지 보여질지 설정
      rowsPerPageOptions={[5, 10]}
      totalRecords={20}
      >
        <Column field='id' header="번호" sortable />
        <Column field='title' header="제목" />
        <Column field='completed' header="완료 유무" />
      </DataTable>
      <button>글 쓰기</button>
    </>

  )
}

export default FullBoard
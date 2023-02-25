import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { getBoard } from '../axios/api';
import './pagination.css'

function Pagination() {

    const queryClient = useQueryClient();
    const { isLoading, isError, data } = useQuery(['todos'], getBoard)


    // 한 페이지당 보여질 데이터 수 상태
    // 데이터 수 조절하고 싶으면 useState 기본값 변경
    const [dataPerPage, setDataPerPage] = useState(10);

    // 선택한 페이지 상태관리
    const [currentPage, setCurrentPage] = useState(1)

    // 반드시 해줘야댐
    if (isLoading) {
        return <h1>로딩중...</h1>
    }
    if (isError) {
        return <h1>Error...</h1>
    }

    // 특정 데이터를 받아서 담을 변수(게시판 글 목록이 담긴 배열 데이터)
    const boardData = data.data

    // 소수점 올림처리
    const totalPages = Math.ceil(boardData.length / dataPerPage)

    // undefined가 담기지만, 각각 index번호는 남아있다
    // 이걸 이용
    // 이렇게 하면 인덱스 번호만 배열에 담긴다
    // 1번부터 시작
    const pages = [...Array(totalPages + 1).keys()].slice(1);

    const indexOfLastBoard = currentPage + dataPerPage
    const indexOfFirstBoard = indexOfLastBoard - dataPerPage
    
    // 한번에 보여질 게시글
    const visibleBoard = boardData.slice(indexOfFirstBoard, indexOfLastBoard)

    // 이전 페이지로 이동
    const prevPageHandler = () => {
        if(currentPage !== 1) {
            setCurrentPage(currentPage -1)
        }
    }
    // 다음 페이지로 이동
    const nextPageHandler = () => {
        if(currentPage !== totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <div>
            {
                visibleBoard.map((item) => (
                    <p key={item.id}>{item.title}</p>
                ))
            }
            <span onClick={prevPageHandler}>Prev</span>
            <p>
                {pages.map(
                    page => <span key={page} 
                    onClick = {
                        () => setCurrentPage(page)}
                    className={`${currentPage === page ? "active" : ""}`}
                        >{`${page} | `}</span>
                )}
            </p>
            <span onClick={nextPageHandler}>Next</span>
        </div>
    )
}

export default Pagination
import React from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { getBoard } from '../axios/api';
import styled from 'styled-components';

const BoardContainer = styled.div`
    display: flex;
    flex-direction: row;
`
const BoardItemContainer = styled.div`
    width: 25%;
    text-align: center;
    margin-top: 100px;
`
const BoardName = styled.div`
    
`

function DormBoard() {
    const queryClient = useQueryClient();
    const { isLoading, isError, data } = useQuery(['todos'], getBoard)
    if (isLoading) {
        return "Loading..."
    }
    if (isError) {
        return "error..."
    };
    

    return (
        <BoardContainer>
           <BoardItemContainer>
            그리핀도르
           </BoardItemContainer>
           <BoardItemContainer>
            레번클로
           </BoardItemContainer>
           <BoardItemContainer>
            후플푸프
           </BoardItemContainer>
           <BoardItemContainer>
            슬리데린
           </BoardItemContainer>
        </BoardContainer>
    )
}

export default DormBoard
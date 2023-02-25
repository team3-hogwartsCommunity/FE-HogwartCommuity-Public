import React, { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import DormBoard from './components/DormBoard'
import Header from './components/Header'
import axios from 'axios'
import Pagination from './components/Pagination'
import { getBoard } from './axios/api'

function App() {
  const queryClient = new QueryClient()

  const [todos, setTodos] = useState([]);
  
  // 컴포넌트 마운트 되면 데이터 불러옴

  return (
    <QueryClientProvider client={queryClient}>
      <Pagination/>
    </QueryClientProvider>

   


  )
}

export default App
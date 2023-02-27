import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Join from '../pages/Join'
import Login from '../pages/Login'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='join' element={<Join />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
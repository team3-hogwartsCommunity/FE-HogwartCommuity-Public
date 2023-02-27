import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreatePost from '../pages/CreatePost'
import Join from '../pages/Join'
import Login from '../pages/Login'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='join' element={<Join />}/>
        <Route path='create_post' element={<CreatePost />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
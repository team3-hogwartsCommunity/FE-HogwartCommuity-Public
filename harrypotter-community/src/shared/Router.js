import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DormBoard from '../components/DormBoard'
import FullBoard from '../components/FullBoard'

import SingleBoard from '../pages/SingleBoard'

function Router() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<FullBoard/>}></Route>
                <Route path='/todolist/:id' element={<SingleBoard/>}></Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default Router
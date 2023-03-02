import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DormBoard from '../components/DormBoard'
import FullBoard from '../components/FullBoard'
import SingleBoard from '../pages/SingleBoard'
import CreatePost from '../pages/CreatePost'
import Join from '../pages/Join'
import Login from '../pages/Login'
import Card from '../components/Card'
import EditPost from '../pages/EditPost'
import Gryffindor from '../pages/Gryffindor'
import Hufflepuff from '../pages/Hufflepuff'
import Ravenclaw from '../pages/Ravenclaw'
import Slytherin from '../pages/Slytherin'
import HouseSort from '../pages/HouseSort'
import HouseResult from '../pages/HouseResult'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='join' element={<Join />}/>
        <Route path='create_post' element={<CreatePost />}/>
        <Route path='/EditPost/:id' element={<EditPost/>}/>
        <Route path='/board' element={<Gryffindor />}></Route>
        <Route path='/HouseSort' element={<HouseSort />}/>
        <Route path='/HouseResult' element={<HouseResult/>}/>
        <Route path='/board/:id' element={<SingleBoard/>}></Route>
        <Route path='card' element={<Card />}></Route>
        <Route path='/Gryffindor' element={<Gryffindor />}></Route>
        <Route path='/Hufflepuff' element={<Hufflepuff />}></Route>
        <Route path='/Ravenclaw' element={<Ravenclaw />}></Route>
        <Route path='/Slytherin' element={<Slytherin />}></Route>

      </Routes>
    </BrowserRouter>

  )
}

export default Router
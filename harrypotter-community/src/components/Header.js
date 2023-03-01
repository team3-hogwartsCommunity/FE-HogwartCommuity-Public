import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'


const DormList = styled.div`
    display: flex;
    flex-direction: row;
`
const DormName = styled.button`
    width: 25%;
    height: 50px;
    text-align: center;
    justify-content: center;
    border: none;
    background-image: linear-gradient(to right top, ${({ color }) => color}, #f2f4f8);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-family: 'lightFont';
    cursor: pointer;
`

function Header() {

  const navigate = useNavigate();

  const goCreateBoard = () => {
    navigate('/create_post')
  }
  return (
    <>
    <HeaderBox>
      <HeaderRow>
        <TitleFont>
          Hogwarts Board
        </TitleFont>
        <div>
        <HeaderButton onClick={goCreateBoard}>writing</HeaderButton>
        <HeaderButton>Logout</HeaderButton>
        </div>
      </HeaderRow>
      <DormList>
        <DormName color='#8b0a0d'>
          <h2>Gryffindor</h2>
        </DormName>
        <DormName color='#043089'>
          <h2>Ravenclaw</h2>
        </DormName>
        <DormName color='#9cce05'>
          <h2>Huffflepuff</h2>
        </DormName>
        <DormName color='#045633'>
          <h2>Slytherin</h2>
        </DormName>
      </DormList>
    </HeaderBox>
    </>
  )
}

const HeaderBox = styled.div`
  background-color: black;
  font-size: 26px;
  font-family: 'harrypotterFont';
`

const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const TitleFont = styled.div`
  padding: 10px;
  font-size: 30px;
  margin-left: 10px;
  margin-top: 5px;
  /* background-image: linear-gradient(to right top, #9a60f2, white);
  background-clip: text;
  -webkit-background-clip: text; */
  color: white;
  font-family: 'harrypotterFont';
`
const HeaderButton = styled.button`
  width : 100px;
  height: 40px;
  font-size: 18px;
  color: black;
  border: none;
  border-radius: 5px;
  margin-right: 40px;
  background-color: white;
  text-align: center;
  box-shadow: inset 1px 2px 2px 1px #2e2d2e;
  font-family: 'lightFont';
`
export default Header
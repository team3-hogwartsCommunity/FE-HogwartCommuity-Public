import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'

function Login() {

  const navigate = useNavigate();

  const initialState = {
    userId : '',
    password : ''
  }

  const [login, setLogin] = useState(initialState);

  const onChangeHandler = (e) => {
    const { name, value } = e.target

    setLogin({
      ...login,
      [name] : value
    })
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (login.userId !== '' && login.password !== '') {
      alert(`id: ${login.userId}, password : ${login.password}`)

    //   try {
    //     const { data } = await axios.post (
    //       `${http://52.79.148.222:8080}/api/auth/login`, login
    //     )
    //     // intercept 사용하기 -> header에서 꺼내와야할 경우
    //     // 1. 쿠키에 토큰 저장, 그전에 새로운 경로에 쿠키 생성
    //     cookie.set('access_token', data.token)

    //     // 2. 로컬저장소에 토큰 저장
    //     localStorage.setItem('Access_Token', data.token)

    //     // 메인페이지로 이동
    //   } catch(error) {
    //     window.alert(error)
    //   }
    // } else {
    //   alert('아이디와 비밀번호를 `올바르게 입력해주세요!')
  }

  }
  return (
    <div>
      <StContainer>
        <HeaddFontStyle>welcome to Hogwarts!</HeaddFontStyle>
        <StLoignBox onSubmit={onSubmitHandler}>
          <div>
            <label>
              <StLoginSpan>ID</StLoginSpan>
              <StLoginInput
                name='userId'
                type='text'
                placeholder='아이디'
                onChange={onChangeHandler}/>
            </label>
            <label>
              <StLoginSpan>PASSWORD</StLoginSpan>
              <StLoginInput
                name='password'
                type='password'
                placeholder='아이디'
                onChange={onChangeHandler}/>
            </label>
          </div>
          <StLoginButton>로그인</StLoginButton>
        </StLoignBox>
        <StForJoinBox>
          <StForJoinInner>
            <SubFontStyle>아직 회원이 아니신가요?</SubFontStyle>
            <StForJoinButton onClick={() => {
              navigate('/join')
            }}>신입생 등록</StForJoinButton>
          </StForJoinInner>
        </StForJoinBox>
      </StContainer>

    </div>
  )
}

const HeaddFontStyle = styled.div`
  color: white;
  font-size: 80px;
  margin-bottom: 100px;
  background-image: linear-gradient(to right top, #b07ffa, #f2f4f8);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`

const SubFontStyle = styled.div`
  color: white;
  font-size: 24px;
  font-family: 'lightFont';
`
const StContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: black;
  font-family: 'harrypotterFont';
`
const StLoignBox = styled.form`
  color: white;
  width: auto;
  height: auto;
  display: flex;
  font-family: 'lightFont';
  flex-direction: row;
`
const StLoginSpan = styled.div`
  font-size: 26px;
  font-weight: 500;
`
const StLoginInput = styled.input`
  width: 300px;
  height: 30px;
  border: none;
  border-radius: 10px;
  box-shadow: inset 5px 5px 10px #545054;
`

const StLoginButton = styled.button`
  width: 100px;
  height: 120px;
  border: none;
  border-radius: 8px;
  margin-top: 30px;
  margin-left: 30px;
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #9a60f2;
  box-shadow: inset 5px 5px 10px #2e2d2e;
  font-family: 'lightFont';
  font-size: 20px;
  cursor: pointer;
`

const StForJoinBox = styled.div`
  margin-top: 100px;
`
const StForJoinInner = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`

const StForJoinButton = styled.button`
  width: 120px;
  height: 35px;
  font-weight: 500;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  box-shadow: inset 5px 2px 10px #acacb2;
  font-family: 'lightFont';
  cursor: pointer;
`


export default Login
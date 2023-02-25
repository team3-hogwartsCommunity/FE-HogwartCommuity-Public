import React from 'react'
import styled from 'styled-components'

function Login() {
  return (
    <div>
      <StContainer>
        <HeaddFontStyle>welcome to Hogwarts!</HeaddFontStyle>
        <StLoignBox>
          <div>
            <label>
              <StLoginSpan>ID</StLoginSpan>
              <StLoginInput/>
            </label>
            <label>
              <StLoginSpan>PASSWORD</StLoginSpan>
              <StLoginInput/>
            </label>
          </div>
          <StLoginButton>로그인</StLoginButton>
        </StLoignBox>
        <StForJoinBox>
          <StForJoinInner>
            <SubFontStyle>아직 회원이 아니신가요?</SubFontStyle>
            <StForJoinButton>신입생 등록</StForJoinButton>
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
const StLoignBox = styled.div`
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
  box-shadow: 5px 5px 10px #fff;
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
  box-shadow: 5px 5px 10px #E1F6FA;
  font-family: 'lightFont';
  font-size: 20px;
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
`


export default Login
import React from "react";
import styled from "styled-components";

function Join() {
  return (
    <div>
      <JoinContainer>
        <JoinFont>Get ready for Freshmen Oriebtation!!</JoinFont>
        <JoinBox>
          <JoinLineCenter>
            <JoinLabel>ID</JoinLabel>
            <JoinInput />
          </JoinLineCenter>
          <JoinLineCenter>
            <JoinLabel>PASSWORD</JoinLabel>
            <JoinInput />
          </JoinLineCenter>
          <JoinLineCenter>
            <JoinLabel>CHECK PW</JoinLabel>
            <JoinInput />
          </JoinLineCenter>
          <JoinButton>입학 완료</JoinButton>å
        </JoinBox>
      </JoinContainer>
    </div>
  );
}

const JoinFont = styled.div`
  color: white;
  font-size: 80px;
  margin-bottom: 80px;
  background-image: linear-gradient(to right top, #b07ffa, #f2f4f8);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-family: 'harrypotterFont'
`;
const JoinContainer = styled.div`
  height: 100vh;
  display: flex;
  background-color: black;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


const JoinBox = styled.form`
  width: 700px;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
// const JoinBoxInline = styled.div`
//   padding: 0;
//   text-align: end;
// `
const JoinLabel = styled.label`
  color: white;
  width: 180px;
  height: 30px;
  display: inline;
  text-align: end;
  font-size: 28px;
  margin-right: 20px;
  float: left;
  font-family: 'lightFont'
`;

const JoinLineCenter = styled.div`
  margin: 0 auto;
`;

const JoinInput = styled.input`
  width: 300px;
  height: 30px;
  box-shadow: inset 5px 5px 10px #545054;
  align-items: center;
  border-radius: 8px;
`;
const JoinButton = styled.button`
  width: 200px;
  height: 60px;
  margin: 0 auto;
  margin-top: 20px;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #9a60f2;
  box-shadow: inset 5px 5px 10px #4d1956;
  font-family: 'lightFont';
  font-size: 20px;
`;

export default Join;

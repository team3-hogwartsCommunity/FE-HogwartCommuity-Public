import React from "react";
import styled from "styled-components";
import { questions } from "../HouseSortData";
import { useState } from "react";

function HouseSort() {
  const questTotalNum = questions.length;
  const [questNum, setQuestNum] = useState(0);
  const portion = Math.floor(((questNum + 1) / questTotalNum) * 100);

  const HouseSortDefault = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #00000099;
  `;

  const ProgressContainer = styled.div`
    margin-top: 200px;
  `;

  const ProgressNum = styled.div`
    display: flex;
    justify-content: center;
    font-family: "lightFont";
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 40px;
    color: white;
    text-shadow: 3px 3px 3px #673ab7;
  `;

  const ProgressStat = styled.div`
    width: 1000px;
    height: 20px;
    background-color: #eeeeee;
    border-radius: 10px;
  `;

  const QuestionContainer = styled.div`
    margin-top: 40px;
    font-size: 32px;
    font-family: "lightFont";
    font-weight: bold;
    margin-bottom: 50px;
    color: white;
    text-shadow: 5px 5px 5px #673ab7;
  `;

  const ProgressBar = styled.div`
    width: ${(props) => props.width + "%"};
    height: 20px;
    background-color: #673ab7;
    border-radius: 10px;
  `;

  const AnswerContainerStyle = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    font-family: "lightFont";
    width: 1000px;
    height: 60px;
    background-color: #eeeeee;
    border-radius: 30px;
    margin-bottom: 30px;
  `;

  const AnswerContainer = (props) => {
    return (
      <AnswerContainerStyle onClick={submitAnswer}>
        {props.answ}
      </AnswerContainerStyle>
    );
  };

  const submitAnswer = () => {
    setQuestNum(questNum + 1);
    console.log(houseScore);
  };

  const houseScore = {
    griffScore: 0,
    huffScore: 0,
    ravenScore: 0,
    slythScore: 0,
  };

  return (
    <HouseSortDefault>
      {/* 프로그레스바 영역 */}
      <ProgressContainer>
        <ProgressNum>
          {questNum + 1} / {questTotalNum}
        </ProgressNum>
        <ProgressStat>
          <ProgressBar width={portion}></ProgressBar>
        </ProgressStat>
      </ProgressContainer>

      {/* 질문영역 */}
      <QuestionContainer>
        {Object.values(questions)[questNum].question}
      </QuestionContainer>

      {/* 답변영역 */}
      {Object.keys(Object.values(questions)[questNum].answers).map(function (
        item
      ) {
        return (
          <AnswerContainer
            answ={Object.values(questions)[questNum].answers[item]}
          ></AnswerContainer>
        );
      })}
    </HouseSortDefault>
  );
}

export default HouseSort;

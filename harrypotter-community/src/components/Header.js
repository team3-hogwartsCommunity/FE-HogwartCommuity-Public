import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { token } from '../axios/api'

const DormList = styled.div`
    display:  flex;
    flex-direction: row;
`
const DormNameGrif = styled.div`
    width: 25%;
    text-align: center;
    background-color: red;
`
const DormNameLev = styled.div`
    width: 25%;
    text-align: center;
    background-color: blue;
`
const DormNameHuf = styled.div`
    width: 25%;
    text-align: center;
    background-color: yellow;
`
const DormNameSli = styled.div`
    width: 25%;
    text-align: center;
    background-color: green;
`



function Header() {
    
    const [dormState, setDormState] = useState();

    const onSetDormStateHandler = (e) => {
        setDormState(e.target.innerText)
    }
    const decoded_token = jwtDecode(token)
    console.log(decoded_token.auth)
    useEffect(() => {
        setDormState(decoded_token.auth)
    }, [])

    const onMakeBoardHandler = () => {
        if(decoded_token.auth !== dormState){
            alert('글쓰기 권한이 없습니다.')   
        }else{
            window.location.replace("create_post")
        }
    }
    // console.log(dormState)
    return (
        <>
            <h1>Domitory Board</h1>
            <button onClick={onMakeBoardHandler}>글 작성하기</button>
            <DormList>
                <DormNameGrif>
                    <h2 onClick={onSetDormStateHandler}>Gryffindor</h2>
                </DormNameGrif>
                <DormNameLev>
                    <h2 onClick={onSetDormStateHandler}>Ravenclaw</h2>
                </DormNameLev>
                <DormNameHuf>
                    <h2 onClick={onSetDormStateHandler}>Hufflepuff</h2>
                </DormNameHuf>
                <DormNameSli>
                    <h2 onClick={onSetDormStateHandler}>Slytherin</h2>
                </DormNameSli>
            </DormList>
        </>
    )
}

export default Header
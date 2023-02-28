import React from 'react'
import styled from 'styled-components'


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
    return (
        <>
            <h1>Domitory Board</h1>
            <DormList>
                <DormNameGrif>
                    <h2>그리핀도르</h2>
                </DormNameGrif>
                <DormNameLev>
                    <h2>레번클로</h2>
                </DormNameLev>
                <DormNameHuf>
                    <h2>후플푸프</h2>
                </DormNameHuf>
                <DormNameSli>
                    <h2>슬리데린</h2>
                </DormNameSli>
            </DormList>
        </>
    )
}

export default Header
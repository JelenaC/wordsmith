import React, { useState } from 'react'
import { Loader } from '../ui-components/Loader'
import { Button } from '../ui-components/Button'
import { Input } from '../ui-components/Input'
import axios from '../api/axios'
import styled from 'styled-components'

const POST_SENTENCES_URL = '/sentence';

function reverseString(str: string){
    const strArray = str.trim().split(' ')
    const reversed =  strArray.map(el=> el.split('').reverse().join(''))
    return reversed.join(' ')
}

function SentenceConverter() {
    const [sentence, setSentence] = useState<string>('')
    const [reversed, setReversedString] = useState<string>('')

    function handleInputChange(e: React.FormEvent<HTMLInputElement>) {
        setSentence(e.currentTarget.value)
    }

    function handleReverseString(str: string) {
        const reversedString = reverseString(str)
        setReversedString(reversedString)
    }

    function deleteReversedSentence(){
        setSentence('')
        setReversedString('')
    }

    async function saveReversedSentence(){
        alert('Saving reveresed sentence...')
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
      
          try {
              const response = await axios.post(POST_SENTENCES_URL, { sentence, reversed }, config)
              console.log(JSON.stringify(response?.data))
              const result = response?.data
              console.log('RESPONSE', response, 'RESULT', result)
              
          } catch (error: any) {
              console.log('ERROR', error)
          }
    }

    return (
        <ContentWrapper>
            <h2>Let's reverse some sentences.. Whoho :)</h2>
            <SentenceWrapper>
                <SentenceInput><Input value={sentence} onChange={handleInputChange} label={'Type sentence'} name={'reverse-sentence'}></Input></SentenceInput>
                <ButtonWrapper><Button children={'Reverse'} type={'button'} onClick={()=>handleReverseString(sentence)}></Button></ButtonWrapper>
            </SentenceWrapper>
            {reversed && reversed!=='' && 
                <SentenceWrapper>
                    <SentenceInput><ReversedSentence>{reversed}</ReversedSentence></SentenceInput>
                    <ButtonWrapper>
                        <Button children={'Save'} type={'button'} onClick={saveReversedSentence}></Button>
                        <Button children={'Cancel'} type={'button'} onClick={deleteReversedSentence}></Button>
                    </ButtonWrapper>
                </SentenceWrapper>
            }
         </ContentWrapper>
    )
}

export { SentenceConverter, reverseString } 

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 1rem;
    & > h1, & > h2, & > h3, & > p {
        color: #003E51; 
    }
    @media (min-width: 48em) {
        width: 70%;
        margin: 0 auto;
    }
`

const SentenceWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin: auto;
    gap: 1rem;
    width: 100%;
`
const ButtonWrapper = styled.div`
    width:30%; 
    display: flex;
    gap: 0.5rem;
`

const SentenceInput = styled.div`
    width:60%; 
`

const ReversedSentence = styled.div`
    border: nonw
    box-sizing: content-box;
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
    background: rgba(0, 62, 81, 0.1);
    font-size: 1rem;
    margin-top: 2rem;
`


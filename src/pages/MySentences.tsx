import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from '../api/axios'
import { Loader } from '../ui-components/Loader'
import { SentenceBlock } from '../ui-components/SentenceBlock'

const GET_SENTENCES_URL = '/sentence';

export type TSentence = {
  id: string,
  created: string,
  sentence: string,
  reversed: string
}

function MySentences() {

const [sentences, setSentences] = useState<TSentence[]>([])
const [loading, setLoading] = useState<boolean>(true)
const [infoMessage, setInfoMessage] = useState<string>('')

  useEffect(() => {
    getSentences()
}, [])

  const getSentences = async () => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }

    try {
      setLoading(true);
        const response = await axios.get(GET_SENTENCES_URL, config)
        console.log(JSON.stringify(response?.data))
        const result = response?.data
        // setTimeout(() => {
        //   setLoading(false)
        // result.length > 0 ? setSentences(result) : setInfoMessage('You do not have any saved reversed sentences')
        // }, 4000)
        setLoading(false)
        result.length > 0 ? setSentences(result) : setInfoMessage('You do not have any saved reversed sentences')
        
    } catch (error: any) {
        if (error.response?.status === 401) {
          setInfoMessage('Unauthorized');
      } else {
          setInfoMessage('Fetch sentences failed');
      }
    }
  }

  if(loading)
  return <Sentences>My saved sentences: <Loader/> </Sentences>

  if(sentences.length===0)
    return <NoSentencesMessage>{infoMessage}</NoSentencesMessage>

  return (
    <Sentences>
      <SentencesList>
          {sentences.map(sentence => 
          <SentenceBlock 
            key={sentence.id}
            sentenceLabel= { 'Original sentence' }
            sentence={sentence.sentence}
            reversedLabel= { 'Reversed sentence' }
            reversed={sentence.reversed}/>
          )}
        </SentencesList>
    </Sentences>
  );
}
export { MySentences }

const Sentences = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2rem 1rem;
    position: relative;
    @media (min-width: 48em) {
      width: 70%;
      margin: 0 auto;
  }
`

const SentencesList = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 1rem;
`

const NoSentencesMessage = styled.div`
    margin: 2rem 1rem;
`
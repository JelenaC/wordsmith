import React, { forwardRef } from 'react'
import styled from 'styled-components'

export interface ISentenceBlock{
  sentenceLabel: string
  sentence: string
  reversedLabel: string
  reversed: string
}

function SentenceBlock ({ sentenceLabel, sentence, reversedLabel, reversed } : ISentenceBlock){

    return (
      <UiSentenceBlock>
      <Label>{sentenceLabel}</Label>
      <TextOriginal>{sentence}</TextOriginal>
      <Label>{reversedLabel}</Label>
      <TextReversed>{reversed}</TextReversed>
    </UiSentenceBlock>
    )
  }

export { SentenceBlock }


const UiSentenceBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  color: #003E51;
  font-weight: bold;
`;

const TextOriginal = styled.div`
border: none;
border-radius: 0.25rem;
padding: 0.5rem 1rem;
background: rgba(255, 196, 22, 0.1);
font-size: 1rem;
&:focus {
  outline: none;
}
`;

const TextReversed = styled.div`
border: none;
border-radius: 0.25rem;
padding: 0.5rem 1rem;
background: rgba(0, 62, 81, 0.1);
font-size: 1rem;
&:focus {
  outline: none;
}
`;

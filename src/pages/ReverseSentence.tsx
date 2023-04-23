import { SentenceConverter } from '../components/SentenceConverter'
import styled from 'styled-components'

function ReverseSentence() {
  return (
    <ContentWrapper>
      Let's reverse some sentences.. Whoho :)
      <SentenceConverter></SentenceConverter>
    </ContentWrapper>
  );
}
export { ReverseSentence }

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;
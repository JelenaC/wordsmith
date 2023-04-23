import styled from 'styled-components'
import { Link } from 'react-router-dom'

function Start() {
  return (
    <StartPageComponent>
      <h1>Welcome!</h1>
      <h3>Are you ready to create funtastic stuff together?</h3>
      <p>But first thing first - you need to log in!</p>
      <LoginLink to="/reverse-sentence">Log in</LoginLink>
    </StartPageComponent>
  )
}

export { Start }

const StartPageComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1rem;
  & > h1, & > h3, & > p {
    color: #003E51; 
  }
  @media (min-width: 48em) {
    width: 70%;
    margin: 0 auto;
  }
  @media (min-width: 64em) {
    width: 50%;
    margin: 0 auto;
  }
`;

const LoginLink = styled(Link)`
  color: #003E51; 
  font-weight: bold;
  text-decoration: none;
  &:hover {
    color:#002C3A;
    text-decoration: underline;
  }
`

//colors
// blue #003E51;
// orange #DE9034;
//beige #F2EFEA;
// text #FFFFFF;
// blue dark #002C3A;
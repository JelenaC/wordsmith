import React from 'react'
import { Link } from 'react-router-dom'
import useAuth  from '../hooks/useAuth'

function ReverseSentence() {

  const { setAuthToken } = useAuth();
  const { authToken } = useAuth()
    console.log('Auth Token My Page ', authToken)

  function logOut() {
    setAuthToken('');
    localStorage.setItem('token', '');
  }


  return (
    <div>
      MyPage
      <button onClick={logOut}>Log out</button>
      <nav>
        <Link to="/reverse-sentence">ReverseSentence</Link>
        <Link to="/my-sentences">MySentences</Link>
      </nav>
    </div>
  );
}
export { ReverseSentence }
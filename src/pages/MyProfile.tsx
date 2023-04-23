import useAuth  from '../hooks/useAuth'

function MyProfile() {

  const { setAuthToken } = useAuth();
  const { authToken } = useAuth()
    console.log('Auth Token My Page ', authToken)

  function logOut() {
    setAuthToken('');
    localStorage.setItem('token', '');
  }


  return (
    <div>
      Here is my profile and user info :)
      <button onClick={logOut}>Log out</button>
    </div>
  );
}
export { MyProfile }
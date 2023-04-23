import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div>
        <h1>Oops!</h1>
        <p>Page Not Found</p>
        <div>
            <Link to="/">Go back to start page</Link>
        </div>
    </div>
  );
}
export { NotFound }

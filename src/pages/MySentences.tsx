import { Link } from 'react-router-dom'

function MySentences() {
  return (
    <div>
      MySentences
      <nav>
        <Link to="/reverse-sentence">ReverseSentence</Link>
        <Link to="/my-sentences">MySentences</Link>
      </nav>
    </div>
  );
}
export { MySentences }

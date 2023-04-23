import { Login } from './pages/Login'
import { Start } from './pages/Start'
import { ReverseSentence } from './pages/ReverseSentence'
import { Layout } from './pages/Layout'
import { NotFound }  from './pages/NotFound'
import { RequireAuth } from './pages/RequireAuth'
import { Routes, Route, Navigate } from 'react-router-dom';
import { MySentences } from './pages/MySentences'
import useAuth from './hooks/useAuth'

function App() {
  const { authToken } = useAuth()
  return (
    <Routes>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/login" element={(authToken && authToken!=='') ? <Navigate to="/reverse-sentence" replace /> : <Login />}/>
        <Route index element={<Start />} />
        {/* <Route path="start" element={<Start />} /> */}

        {/* we want to protect these routes */}
        <Route element={<RequireAuth/>}>
          <Route index element={<ReverseSentence />} />
          <Route path="reverse-sentence" element={<ReverseSentence />} />
          <Route path="my-sentences" element={<MySentences />} />
        </Route>
        {/* display custom 404 */}
        <Route path='/404' element={<NotFound/>} />
        <Route path='*' element={<Navigate replace to='/404'/>} />
      </Route>
    </Routes>
  );
}

export default App

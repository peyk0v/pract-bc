import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login' 
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const savedToken = window.localStorage.getItem('books-user-token')
    if(savedToken) {
      setToken(savedToken)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('books-user-token')
    setToken(null)
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { token ?
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={handleLogout}>logout</button>
          </>
          :
          <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Login show={page === 'login'} setToken={setToken} setPage={setPage}/>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} token={token} />
    </div>
  )
}

export default App

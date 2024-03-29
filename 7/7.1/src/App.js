import { useState } from 'react'
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'
import Anecdote from './components/Anecdote' 
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

	const navigate = useNavigate()

  const addNew = (anecdote) => {
    const idAsString = (Math.random() * 10000).toFixed(0)
		anecdote.id = parseInt(idAsString)
    setAnecdotes(anecdotes.concat(anecdote))
		navigate('/anecdotes')
  }

	const match = useMatch('/anecdotes/:id')
	const anecdote = match
			? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
			: null

  return (
    <div>
      <h1>Software anecdotes</h1>
			<Menu />
			<Routes>
				<Route path='/anecdotes' element={<AnecdoteList anecdotes={anecdotes} />}/>
				<Route path='/anecdotes/new' element={<CreateNew addNew={addNew}/>}/>
				<Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote}/>} />
				<Route path='/about' element={<About/>}/>
			</Routes>
      <Footer />
    </div>
  )
}

export default App

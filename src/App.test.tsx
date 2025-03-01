import { render, screen } from '@testing-library/react'
import App from './App'
import { act } from 'react'
import ToDo from './components/ToDo'
import TaskAdder from './components/TaskAdder'
import SorterFilter from './components/SorterFilter'

test('render App', () => {
  render(<App />)

  const startScreen = screen.getByText('ТУДУЛИСТ')

  expect(startScreen).toBeInTheDocument()
})

test('render task adder', () => {
  render(<TaskAdder />)
  const taskAddIn = screen.getByPlaceholderText('Что нам нужно сделать?')

  expect(taskAddIn).toBeInTheDocument()
})

test('render sorter-filter', () => {
  render(<SorterFilter />)
  const showAll = screen.getByText('Все')
  const showUndone = screen.getByText('Невыполненные')
  const showDone = screen.getByText('Выполненные')
  const showFav = screen.getByText('Избранные')
  expect(showAll).toBeInTheDocument()
  expect(showDone).toBeInTheDocument()
  expect(showUndone).toBeInTheDocument()
  expect(showFav).toBeInTheDocument()
})

import { useEffect, useState } from 'react'
import './App.css'
import { useTaskListStore } from './components/store'
import {
  AppEl,
  TodoListHeader,
} from './components/stylized_components/stylizedComponents'
import { Divider } from 'antd'
import ToDo from './components/ToDo'
import TaskAdder from './components/TaskAdder'
import SorterFilter from './components/SorterFilter'
import { task } from './components/store'

function App() {
  let simplePage = 1
  const [testPage, setTestPage] = useState(1)
  const { tasksList, getTasks, filter, page, turnPage } = useTaskListStore(
    (state) => state
  )
  let dataUrl = `https://cms.laurence.host/api/tasks?pagination%5Bpage%5D=${simplePage}`

  const getTasksFromServer = async (url: string) => {
    if (localStorage.getItem('favoriteList')) {
      const favoriteDataJson: any = localStorage.getItem('favoriteList')
      const favoriteData = JSON.parse(favoriteDataJson)
      const sortedJson = favoriteData.data.sort(
        (a: task, b: task) => b.id - a.id
      )
      getTasks(sortedJson)
    }
    try {
      let response = await fetch(url)
      if (response.ok) {
        localStorage.setItem('favoriteList', '')
        const json = await response.json()
        const sortedJson = json.data.sort((a: task, b: task) => b.id - a.id)
        getTasks(sortedJson)
      }
    } catch (error) {
      console.error('Ошибка при загрузке ', error)
    }
  }

  const saveFavorites = () => {
    const found: task[] = tasksList.filter(
      (el) => el.attributes.status === 'Избранное'
    )
    localStorage.setItem('favorites', JSON.stringify(found))
  }

  useEffect(() => {
    getTasksFromServer(dataUrl)
    simplePage++
    document.body.onscroll = (e) => {
      if (
        document.documentElement.scrollHeight ===
        document.documentElement.scrollTop +
          document.documentElement.clientHeight
      ) {
        getTasksFromServer(
          `https://cms.laurence.host/api/tasks?pagination%5Bpage%5D=${simplePage++}`
        )
      }
    }

    saveFavorites()
  }, [])
  return (
    <AppEl>
      <TodoListHeader>ТУДУЛИСТ</TodoListHeader>
      <SorterFilter />
      <TaskAdder />

      <Divider>
        <TodoListHeader>Список задач</TodoListHeader>
      </Divider>
      {tasksList.length === 0 && (
        <TodoListHeader>Nothing to show</TodoListHeader>
      )}
      {!filter &&
        tasksList.map((_) => {
          return <ToDo el={_} key={_.id}></ToDo>
        })}
      {filter &&
        tasksList.map((_) => {
          if (_.attributes.status === filter) {
            return <ToDo el={_} key={_.id}></ToDo>
          }
        })}
    </AppEl>
  )
}

export default App

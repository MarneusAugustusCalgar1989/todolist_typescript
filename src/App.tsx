import { useEffect } from 'react';
import './App.css';
import { useTaskListStore } from './components/store';
import {
  AppEl,
  TodoListHeader,
} from './components/stylized_components/stylizedComponents';
import { Divider } from 'antd';
import ToDo from './components/ToDo';
import TaskAdder from './components/TaskAdder';
import SorterFilter from './components/SorterFilter';
import { task } from './components/store';

function App() {
  const dataUrl = 'https://cms.laurence.host/api/tasks';
  const { tasksList, getTasksFromServer, filter } = useTaskListStore(
    state => state
  );
  const saveFavorites = () => {
    const found: task[] = tasksList.filter(
      el => el.attributes.status === 'Избранное'
    );
    localStorage.setItem('favorites', JSON.stringify(found));
  };
  useEffect(() => {
    getTasksFromServer(dataUrl);
    saveFavorites();
  }, []);
  return (
    <AppEl>
      <TodoListHeader>TODOLIST</TodoListHeader>
      <SorterFilter />
      <TaskAdder />

      <Divider>
        <TodoListHeader>Tasks list</TodoListHeader>
      </Divider>
      {tasksList.length === 0 && (
        <TodoListHeader>Nothing to show</TodoListHeader>
      )}
      {!filter &&
        tasksList.map(_ => {
          return <ToDo el={_} key={_.id}></ToDo>;
        })}
      {filter &&
        tasksList.map(_ => {
          if (_.attributes.status === filter) {
            return <ToDo el={_} key={_.id}></ToDo>;
          }
        })}
    </AppEl>
  );
}

export default App;

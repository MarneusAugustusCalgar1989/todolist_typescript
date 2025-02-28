import React, { useState } from 'react';
import { Card, Space } from 'antd';
import { Button } from 'antd';
import {
  ToDoEl,
  ButtonWrapper,
} from './stylized_components/stylizedComponents';
import { TodoProps, useTaskListStore } from './store';

const ToDo: React.FC<TodoProps> = ({ el }) => {
  const { tasksList } = useTaskListStore(state => state);
  const { id, attributes } = el;
  const { status, description, title } = attributes;

  const [doneTask, setDoneTask] = useState(
    status === 'Выполнена' ? true : false
  );
  const [favorite, setFavorite] = useState(
    status === 'Избранное' ? true : false
  );
  const saveFavorites = () => {
    const found = tasksList.filter(el => el.attributes.status === 'Избранное');
    localStorage.setItem('favoriteList', JSON.stringify(found));
  };
  const { changeTaskStatus } = useTaskListStore(state => state);
  const toggleTaskStatus = () => {
    setFavorite(false);
    changeTaskStatus(id, !doneTask ? 'Выполнена' : 'Не выполнена');
  };
  const toggleFavorites = () => {
    saveFavorites();
    changeTaskStatus(
      id,
      !favorite ? 'Избранное' : doneTask ? 'Выполнена' : 'Не выполнена'
    );
    setFavorite(!favorite);
  };

  return (
    <ToDoEl>
      <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
        <Card
          title={title}
          size='small'
          style={
            status === 'Избранное'
              ? { background: 'rgba(255,0,0,0.1)' }
              : status === 'Выполнена'
              ? { background: 'rgba(0,255,0,0.1)' }
              : { background: 'white' }
          }
        >
          <p>{description}</p>
        </Card>
        <ButtonWrapper>
          {status === 'Избранное' ? (
            <Button type='default' onClick={toggleFavorites}>
              Remove from Favorites
            </Button>
          ) : (
            <Button type='default' onClick={toggleFavorites}>
              Add to Favorites
            </Button>
          )}

          {status === 'Выполнена' ? (
            <Button
              type='default'
              onClick={() => {
                setDoneTask(!doneTask);
                toggleTaskStatus();
              }}
            >
              Finished
            </Button>
          ) : (
            <Button
              type='default'
              onClick={() => {
                setDoneTask(!doneTask);
                toggleTaskStatus();
              }}
            >
              Done
            </Button>
          )}
        </ButtonWrapper>
      </Space>
    </ToDoEl>
  );
};

export default ToDo;

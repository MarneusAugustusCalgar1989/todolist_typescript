import React from 'react';
import { SorterFilterStyled } from './stylized_components/stylizedComponents';
import { Button } from 'antd';
import { useTaskListStore } from './store';
const SorterFilter = () => {
  const { setFilter, filter } = useTaskListStore(state => state);

  return (
    <SorterFilterStyled>
      <Button
        type={filter === '' ? 'primary' : 'default'}
        onClick={() => setFilter('')}
      >
        Все
      </Button>
      <Button
        type={filter === 'Выполнена' ? 'primary' : 'default'}
        onClick={() => setFilter('Выполнена')}
      >
        Выполненные
      </Button>
      <Button
        type={filter === 'Не выполнена' ? 'primary' : 'default'}
        onClick={() => setFilter('Не выполнена')}
      >
        Невыполненные
      </Button>
      <Button
        type={filter === 'Избранное' ? 'primary' : 'default'}
        onClick={() => setFilter('Избранное')}
      >
        Избранные
      </Button>
    </SorterFilterStyled>
  );
};

export default SorterFilter;

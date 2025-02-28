import styled from 'styled-components';

export const AppEl = styled.div`
  width: clamp(290px, 80%, 800px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const TodoListHeader = styled.h1`
  color: rgba(0, 0, 0, 0.3);
`;

export const ToDoEl = styled.div`
    width: clamp(290px, 80%, 800px);
    margin-bottom: 2rem;
    cursor: pointer;   
    }
  `;
export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: -2rem;
`;
export const SorterFilterStyled = styled.div`
  width: 80%;
  height: 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;
export const InputField = styled.div`
  min-width: 90%;
  min-height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: space-between;
`;

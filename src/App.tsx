import { useState } from 'react'
import './App.scss'
import { styled } from "@mui/material";
import { AddTodo } from "./components/addTodo/AddTodo.tsx";

export const Root = styled('div')`
    border: 1px solid aqua;
    height: 100dvh;
    min-width: 600px;
    display: flex;
    flex-direction: column;
    //justify-content: center;

    padding: ${({ theme }) => theme.spacing(1)};
`;
export const Title = styled('div')`
    border: 1px solid aliceblue;
    font-size: 5rem;
    font-weight: 100;
    color: #E08400;
    text-align: center;
`;

function App() {
  const [count, setCount] = useState(0);


  const handleAddTodo = (newTodo: string) => {
    console.log(newTodo)
  }

  return (
    <Root>
      <Title>todos</Title>
      <AddTodo onAdd={handleAddTodo}/>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </Root>
  )
}

export default App

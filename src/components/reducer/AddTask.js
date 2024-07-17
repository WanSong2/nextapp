import { useContext, useState } from 'react';
import { useTasks, useDispatch } from "@/hooks/tasksContext";
export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const tasks = useTasks();
  let nextId = tasks.length;

  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        dispatch({
          type: 'added',
          id: nextId++,
          text
        });
      }}>Add</button>
    </>
  )
}
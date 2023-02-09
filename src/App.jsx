import './App.scss';
import './reset.css'
import React, { useState } from 'react';

function App() {

  let [input, setInput] = useState();
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentValue, setCurrentValue] = useState('');


function handleOnSubmit (e) {
    e.preventDefault();
    input=input.trim();
    if(input) {
      let newobj = {
        id: new Date().getTime(),
        content: input
      }
      setTodos([newobj, ...todos]);
    } else alert("input is empty")
    setInput("");
  } 

  function handleOnChange (e) {
    setInput(e.target.value);
  }

  function handOnclickDelete (id) {
    const newtodos = todos.filter(val => id!=val.id);
    setTodos(newtodos);
  }

  function handOnclickEdit (id, content) {
    setSelectedItem(id);
    setCurrentValue(content);
    setEditing(true);
  }

  function handleSubmitEdit (e) {
    setCurrentValue(e.target.value);
  }

  function handOnclickSave (id) {
    setEditing(false);
    todos.map(val=>{
      if (val.id===id) val.content=currentValue;
    })
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Todo</h1>
        <form action="submit" onSubmit={handleOnSubmit}>
          <input onChange={handleOnChange} value={input} type="text" placeholder='Add new task...' id='inputId'/>
          <button >Add</button>
        </form>
        <ul>
          {
            todos.length ? 
            todos.map((val)=>{
              return <li key={val.id}>
                <div className="row">
                {selectedItem === val.id && editing ? (
                  <div>
                    <input
                    type="text"
                    value={currentValue}
                    onChange={handleSubmitEdit}
                    />
                    <button onClick={()=>handOnclickSave(val.id)}>save</button>
                  </div>
                  
                )
                  :
                  <span>{val.content}</span>
                  }
                  <div className="function">
                    <i onClick={()=>handOnclickEdit(val.id,val.content)} className="fa-solid fa-file-pen"></i>
                    <i onClick={()=> handOnclickDelete(val.id)} className="fa-solid fa-trash-can"></i>
                  </div>
                </div>
              </li>
            })
            :
            <h3>Empty Task</h3>
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
 
import axios from 'axios'
import { useEffect, useState } from 'react'
import Loading from './components/Loading';
import ListItem from './components/ListItem';

function App() {
  const [todos,setTodos]=useState(null);
useEffect(()=>{
  axios.get('http://localhost:3000/todos')
  .then((res)=>setTodos(res.data))
},[]);
  return (

    <div className='container py-5'>
      <h3>Yapılacaklar Listesı</h3>
      <form className='d-flex justify-content-center gap-4 my-5'>
        <input type="text" className='form-control shadow' />
        <button className='btn btn-primary shadow '>Gönder</button>
      </form>

      <ul>
        {/*Apidan cevap beklerken.Eğer null isa Yülleniyor yazar */}
        {todos === null && <Loading/>}
        {/*eğer todo true isa  todos dizisini map ile döner ve listeler */}
        {todos && todos.map((todo)=>
        <ListItem todos={todo} key={todo.id} allTodos={todos} setTodos={setTodos}/>)}
      </ul>



    </div>
  )
}

export default App

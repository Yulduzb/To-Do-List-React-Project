import axios from 'axios'
import { useEffect, useState } from 'react'
import Loading from './components/Loading';
import ListItem from './components/ListItem';
import {v4 as uuidv4} from 'uuid';
import {TbPlayerTrackPrev,TbPlayerTrackNext} from 'react-icons/Tb'


axios.defaults.baseURL='http://localhost:3000';

function App() {
  const [todos,setTodos]=useState(null);
  const [pages,setPages]=useState(1)
  const [totalPage,setTotalPages]=useState()
  const [totalCount,setTotalCount]=useState()

const options={
  params:{
    _limit:5,
    _page:pages,
  },
};


useEffect(()=>{
  axios.get('http://localhost:3000/todos',options)
  
 .then((res)=>{
  const itemCount=Number(res.headers['x-total-count']);
  const max=(Math.ceil(itemCount/options.params._limit))
  setTotalPages(max);
  setTotalCount(itemCount);

  setTodos(res.data);
 })


}
,[pages,options]);

const HandleSubmit =(e)=>{
  e.preventDefault();
  if(!e.target[0].value){
    alert("Lütfen başliği giriniz")
    return
  }
  const newTodo={
    id:uuidv4(),
    title:e.target[0].value,
    date:new Date(),
    isDone:false,
  }
  axios.post(`/todos`,newTodo).then(()=>{
    if(todos.length === options.params._limit){//eğer todos ın uzunlugu limita eşitsa
      //toplam countun limite modunu alir.eğer 0 sa page a 1 ekler sonraki sayfaya gecer.1 eşitsa son sayfada kalır
       setPages(totalCount % options.params._limit === 0 ? totalPage+1: totalPage) 
    }else{
      setTodos([...todos,newTodo]);
    }
  });
  
  
  

}
  return (

    <div className='container py-5 mt-4'>
      <h3 className='text-center'>Yapılacaklar Listesı</h3>
      <form onSubmit={HandleSubmit} className='d-flex justify-content-center gap-4 my-5'>
        <input type="text" className='form-control shadow' />
        <button className='btn btn-primary shadow '>Gönder</button>
      </form>

      <ul className='list-group'>
        {/*Apidan cevap beklerken.Eğer null isa Yükleniyor çalişir */}
        {todos === null && <Loading/>}
        {/*eğer todo true isa  todos dizisini map ile döner ve listeler */}
        {todos && todos.map((todo)=>
        <ListItem todos={todo} key={todo.id} allTodos={todos} setTodos={setTodos}/>)}
      </ul>

      <div className='d-flex justify-content-between mt-3'>
        <button disabled={pages===1} onClick={()=>setPages(pages-1)} className='btn btn-info text-light px-4'><TbPlayerTrackPrev className='fs-4'/></button>
        <p className='fw-bold'>{pages}</p>
        <button disabled={pages===totalPage} onClick={()=>setPages(pages+1)} className='btn btn-info text-light px-4'><TbPlayerTrackNext className='fs-4'/></button>
      </div>



    </div>
  )
}

export default App

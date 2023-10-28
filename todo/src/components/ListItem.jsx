import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import {AiOutlineCheck} from 'react-icons/Ai'
import {AiOutlineClose} from 'react-icons/Ai'



const ListItem=({todos,allTodos,setTodos}) => {
    const [isEditMood,setIsEditMood]=useState(false)
    /*elemeni silen hem apiden hem listeden silen fonsiyon */
const handleDelete=()=>{
axios.delete(`todos/${todos.id}`)
.then(()=>{
   const fitered= allTodos.filter((item)=>item.id !== todos.id);
   setTodos(fitered)
})
.catch(err => alert("Bir hata oluştu..."))
}

const handleChange=()=>{
    const updated={...todos,isDone:!todos.isDone}
    axios.put(`todos/${todos.id}`,updated)
    //state i guncellemek
    const newTodos=allTodos.map((i)=>
    i.id===updated.id ? updated : i)
    setTodos(newTodos);
    
    
}

const handleEdit=(event)=>{
event.preventDefault()
const newTitle=(event.target[0].value)
const edited={...todos,title:newTitle}
axios.put(`/todos/${todos.id}`,edited)
.then(()=>{
   const newTodos= allTodos.map((item)=>
    item.id === edited.id ? edited : item

   );
   setTodos(newTodos);
   setIsEditMood(false);
});
}



    return (
        <li className="d-flex justify-content-between aligin-items-center list-group-item">
            <div className="d-flex gap-2 ">
                <input checked={todos.isDone}
                onChange={handleChange} className="form-check-input" type="checkbox" />
                <span>{todos.isDone ? 'Tamamlandı' : 'Devam Ediyor'}</span>
                

            </div>
            {isEditMood ? (
                <form onSubmit={handleEdit} className='d-flex gap-3' >
                <input type="text" className='form-control shadow' defaultValue={todos.title}/>
                <button type='Submit' className='btn btn-success px-4 '><AiOutlineCheck/></button>
                <button type="button" onClick={()=>setIsEditMood(false)} className='btn btn-warning px-4'><AiOutlineClose/></button>
                </form>
            ):( <span>{todos.title}</span>)}
           {!isEditMood ?
           (
            <div className="d-flex gap-2">
                <button disabled={isEditMood} onClick={()=>setIsEditMood(true)} className="btn btn-success" >Düzenle</button>
                <button className="btn btn-danger" onClick={handleDelete}>Sil</button>
            </div>

           ):
           (<span></span>)}
            
        </li>

    );
};
ListItem.propTypes = {
    todos: PropTypes.shape({
      isDone: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      id:PropTypes.string.isRequired

      // Diğer prop türleri
    }).isRequired,
    allTodos: PropTypes.array.isRequired, // allTodos prop'unun veri türünü belirleyin
    setTodos: PropTypes.func.isRequired, // setTodos prop'unun bir fonksiyon olması gerektiğini belirtin
  
  };
  

export default ListItem

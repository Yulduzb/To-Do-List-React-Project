import axios from 'axios';
import PropTypes from 'prop-types';



const ListItem=({todos,allTodos,setTodos}) => {
    
    /*elemeni silen hem apiden hem listeden silen fonsiyon */
const HandleDelete=()=>{
axios.delete(`/${todos.id}`)
.then(()=>{
   const fitered= allTodos.filter((item)=>item.id !== todos.id);
   setTodos(fitered)
})
.catch(err => alert("Bir hata oluştu..."))
}
    return (
        <li className="d-flex justify-content-between aligin-items-center list-group-item">
            <div className="d-flex gap-2 ">
                <input className="form-check-input" type="checkbox" />
                <span>{todos.isDone ? 'Tamamlandı' : 'Devam Ediyor'}</span>
                

            </div>
            <span>{todos.title}</span>
            <div className="d-flex gap-2">
                <button className="btn btn-success" >Düzenle</button>
                <button className="btn btn-danger" onClick={HandleDelete}>Sil</button>
            </div>
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

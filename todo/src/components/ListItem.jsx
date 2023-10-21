import PropTypes from 'prop-types';

const ListItem=({todos}) => {

    return (
        <li className="d-flex justify-content-between aligin-items-center  my-5 ">
            <div className="d-flex gap-2 ">
                <input className="form-check-input" type="checkbox" />
                <span>{todos.isDone ? 'Tamamlandı' : 'Devam Ediyor'}</span>
                

            </div>
            <span>{todos.title}</span>
            <div className="d-flex gap-2">
                <button className="btn btn-success" >Düzenle</button>
                <button className="btn btn-danger">Sil</button>
            </div>
        </li>

    );
};
ListItem.propTypes = {
    todos: PropTypes.shape({
      isDone: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      // Diğer prop türleri
    }).isRequired,
  };
  

export default ListItem

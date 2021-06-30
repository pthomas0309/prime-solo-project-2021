function ActivityEditBtn(props) {

  return (
    <button 
        id={props.id} value={props.userId} onClick={ e => props.editEvent(e)} >
        DELETE
    </button>
  );
}

export default ActivityEditBtn;

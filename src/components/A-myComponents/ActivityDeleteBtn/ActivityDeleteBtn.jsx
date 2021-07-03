function ActivityDeleteBtn(props) {

  return (
    <button 
        id={props.id} value={props.userId} onClick={ e => props.deleteEvent(e)} >
        DELETE
    </button>
  );
}

export default ActivityDeleteBtn;

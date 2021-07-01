function ActivityEditBtn({id, type, editEvent, userId}) {

  return (
    <button 
        id={id} value={userId} onClick={ e => {editEvent(e, type)}} >
        EDIT
    </button>
  );
}

export default ActivityEditBtn;

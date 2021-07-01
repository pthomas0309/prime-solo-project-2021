function ActivityEditBtn({id, type, editEvent, userId}) {

  return (
    <button 
        id={id} value={userId} onClick={ e => {editEvent(e, type, id, userId)}} >
        EDIT
    </button>
  );
}

export default ActivityEditBtn;

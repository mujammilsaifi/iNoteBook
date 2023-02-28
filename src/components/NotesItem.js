import React from "react";

const NotesItem = (props) => {
  const { note } = props;
  return (
    <div class="col-md-3 my-2" >
      <div className="card" >
        <div class="card-body">
          <h5 class="card-title">{note.title}</h5>
          <p class="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};
export default NotesItem;

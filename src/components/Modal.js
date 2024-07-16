import React, { useContext } from "react";
import "./Modal.css";
import noteContext from "../context/notes/NoteContext";

const Modal = (props) => {
  const { isOpen, closeModal, setIsOpen, enote, esetNote } = props;
  const context = useContext(noteContext);
  const { editNote } = context;

  const onChange = (e) => {
    esetNote({ ...enote, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    editNote(enote.id, enote.etitle, enote.edescription, enote.etag);
    props.showAlert("Note updated successfully!", "success");
    setIsOpen(false);
  };

  return (
    <div>
      {isOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Note</h3>
            <form className="container my-3">
              <div className="my-3">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="etitle"
                  name="etitle"
                  placeholder="Enter Title"
                  value={enote.etitle}
                  onChange={onChange}
                />
              </div>
              <div className="my-3">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="edescription"
                  name="edescription"
                  placeholder="Description"
                  value={enote.edescription}
                  onChange={onChange}
                />
              </div>
              <div className="my-3">
                <label htmlFor="etag">Tag</label>
                <input
                  type="text"
                  className="form-control"
                  id="etag"
                  name="etag"
                  placeholder="Enter Tag"
                  value={enote.etag}
                  onChange={onChange}
                />
              </div>
              <div className="button-group">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Update
                </button>
                <button className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;

import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let path = location.pathname;
  const handleLogout=()=>{
    navigate("/login");
    localStorage.removeItem('token')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/home  ">CloudNote</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <Link className={`nav-link ${path === '/home' ? 'active' : ''}`} aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${path === '/about' ? 'active' : ''}`} to="/about">About</Link>
        </li>
      </ul>
    </div> 
    {!localStorage.getItem('token') ? <form className='d-flex'>
    <Link className="btn btn-primary mx-2" to="login" role="button">Login</Link>
    <Link className="btn btn-primary" to="/signup" role="button">Signup</Link>
    </form> :
    // eslint-disable-next-line
    <button className="btn btn-primary" onClick={handleLogout} role="button">Log Out</button> }
    
  </div>
</nav>
  )
}

export default Navbar


// import React, { useState } from "react";

// const Navbar = (props) => {
//   const [showForm, setShowForm] = useState(false);
//   const [note, setNote] = useState({
//     title: "",
//     description: "",
//     tag: "",
//   });

//   const handleExpand = () => setShowForm(true);

//   const handleAddNote = (e) => {
//     e.preventDefault();
//     if (note.title && note.description) {
//       props.addNote(note.title, note.description, note.tag);
//       props.showAlert("Note added successfully!", "success");
//       setNote({ title: "", description: "", tag: "" });
//       setShowForm(false); // Close after adding
//     }
//   };

//   const onChange = (e) => {
//     setNote({ ...note, [e.target.name]: e.target.value });
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
//       {/* Left Section */}
//       <div className="navbar-brand">CloudNote</div>

//       {/* Center Section: Expanding Form */}
//       <form className="note-form mx-auto" onSubmit={handleAddNote}>
//         <div className={`form-group ${showForm ? "expanded" : ""}`}>
//           {showForm && (
//             <input
//               type="text"
//               className="form-control mb-2"
//               name="title"
//               placeholder="Add Title"
//               value={note.title}
//               onChange={onChange}
//               autoComplete="off"
//             />
//           )}

//           <input
//             type="text"
//             className="form-control mb-2"
//             name="description"
//             placeholder="Take a note..."
//             value={note.description}
//             onChange={onChange}
//             autoComplete="off"
//             onFocus={handleExpand}
//           />

//           {showForm && (
//             <>
//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 name="tag"
//                 placeholder="Enter Tag"
//                 value={note.tag}
//                 onChange={onChange}
//                 autoComplete="off"
//               />
//               <button
//                 type="submit"
//                 className="btn btn-primary w-100"
//               >
//                 Add Note
//               </button>
//             </>
//           )}
//         </div>
//       </form>

//       {/* Right Section */}
//       <div className="d-flex align-items-center">
//         <button className="btn btn-outline-secondary mx-2">Login</button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

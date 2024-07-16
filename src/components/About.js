import React from "react"
import { Link } from "react-router-dom"

const About = () => {
  return (
    <div className="container my-5 pt-5">
    <div className="row">
      <div className="col-lg-8 offset-lg-2">
        <h1 className="mb-4">About Cloud Note</h1>
        <p>
          Welcome to <strong>Cloud Note</strong>, your go-to application for managing notes efficiently and securely in the cloud. Whether you are a student, professional, or someone who loves to keep their thoughts organized, Cloud Note is designed to meet all your note-taking needs.
        </p>
        <h2 className="mt-5">Key Features</h2>
        <ul>
          <li><strong>Cloud Storage:</strong> Save your notes securely in the cloud and access them from anywhere, on any device.</li>
          <li><strong>Rich Text Editing:</strong> Use our powerful editor to format your notes with ease.</li>
          <li><strong>Tagging:</strong> Organize your notes with tags to quickly find what you need.</li>
          <li><strong>Search Functionality:</strong> Instantly search through your notes to find specific information.</li>
          {/* <li><strong>Collaborative Sharing:</strong> Share your notes with others and collaborate in real-time.</li> */}
          <li><strong>Secure Authentication:</strong> Protect your notes with secure login and authentication methods.</li>
        </ul>
        <h2 className="mt-5">Why Choose Cloud Note?</h2>
        <p>
          At Cloud Note, we understand the importance of having a reliable and user-friendly note-taking app. Our platform is built with the latest technologies to ensure that your notes are always accessible and secure. Whether you are jotting down a quick idea or compiling detailed project notes, Cloud Note offers the tools you need to stay organized and productive.
        </p>
        <h2 className="mt-5">Get Started</h2>
        <p>
          Getting started with Cloud Note is easy. Simply create an account, and you'll be on your way to a more organized life. Enjoy the flexibility and convenience of managing your notes in the cloud.
        </p>
        <p className="text-center mt-5">
          <Link to="/signup" className={`btn btn-primary btn-lg ${localStorage.getItem('token') ? 'disabled' : ''}`}>Sign Up Now</Link>
        </p>
      </div>
    </div>
  </div>
  )
}

export default About


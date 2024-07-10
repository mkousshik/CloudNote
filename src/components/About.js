import React, {useContext, useEffect} from 'react'
import noteContext from '../context/notes/NoteContext'

const About = () => {
  const a = useContext(noteContext);
  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, [])
  
  return (
    <div>this is About {a.state.name} and roll no {a.state.class}</div>
  )
}

export default About


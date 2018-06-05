import React from 'react';

// Used to iterate through potential identities to provide users options
const NewOption = (props) => {
  return(
    <div>
      <input className="list-item" type="radio" onChange={props.handleOptionChange} checked={props.checked} value={props.value} id={props.firebaseKey}/>
      <label className="paragraph paragraph--large input-label" htmlFor={props.firebaseKey}>{props.identity}</label>
    </div>
  )
}

export default NewOption;
import React from 'react';

const NewOption = (props) => {
  return(
    <div>
      <label htmlFor={props.firebaseKey}>{props.identity}</label>
      <input type="radio" onChange={props.handleOptionChange} checked={props.checked} value={props.value} id={props.firebaseKey}/>
    </div>
  )
}

export default NewOption;
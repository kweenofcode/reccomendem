import React from 'react';

const NewOption = (props) => {
  return(
    <div>
      <input type="radio" onChange={props.handleOptionChange} checked={props.checked} value={props.value} id={props.firebaseKey}/>
      <label className={props.className} htmlFor={props.firebaseKey}>{props.identity}</label>
    </div>
  )
}

export default NewOption;
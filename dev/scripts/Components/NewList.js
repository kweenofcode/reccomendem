import React from 'react';

class Checkbox extends React.Component{
  render() {
    return(
      <div> 
        <input 
          key={this.props.firebaseKey}
          id={this.props.firebaseKey}
          type="checkbox" 
          value={this.props.label}
          checked = {this.props.isChecked}
          onChange={()=>{this.props.handleCheckbox(this.props.firebaseKey, this.props.isChecked)}}
          />
        <label className="paragraph paragraph--large" htmlFor={this.props.firebaseKey}>
        {this.props.label}
        </label>
      </div>
    );
  }
}


export default Checkbox;
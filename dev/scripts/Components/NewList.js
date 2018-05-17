import React from 'react';

class Checkbox extends React.Component{
  render() {
    return(
      <div> 
        <label htmlFor={this.props.firebaseKey}>
          <input 
          key={this.props.firebaseKey}
          id={this.props.firebaseKey}
          type="checkbox" 
          value={this.props.label}
          checked = {this.props.isChecked}
          onClick={()=>{this.props.handleCheckbox(this.props.firebaseKey, this.props.isChecked)}}
          />
        {this.props.label}
        </label>
      </div>
    );
  }
}


export default Checkbox;
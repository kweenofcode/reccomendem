import React from 'react';

class NewListItem extends React.Component {
  render() {
    return (
        <li className="paragraph profile__skills__item">{this.props.value}</li>
    );
  }
}

export default NewListItem;
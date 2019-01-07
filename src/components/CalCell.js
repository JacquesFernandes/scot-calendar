import React from 'react';
import {
  Table
} from 'semantic-ui-react';

class CalCell extends React.Component {

  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, data) {
    console.log("card click:", data);
  }

  render() {
    return(
      <Table.Cell
        style={{marginTop:"0.5em", cursor:(this.props.date)? "pointer" : null}}
        onClick={(this.props.date)? this.handleClick : null}
        >
        {this.props.date}
      </Table.Cell>
    );
  }
}

export default CalCell;
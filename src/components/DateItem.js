import React from 'react';
import {
  Table,
  TextArea,
  Button,
} from 'semantic-ui-react';

class DateItem extends React.Component {

  render() {
    return(
      <Table.Row>
        <Table.Cell textAlign="center" >
          <TextArea 
            autoHeight
            value={this.props.content}
            style={{width:"100%"}}
          />
        </Table.Cell>
        <Table.Cell textAlign="center" >
          <Button.Group vertical >
            <Button icon="save" secondary />
            <Button icon="check" primary />
          </Button.Group>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default DateItem;
import React from 'react';
import _ from 'lodash';
import {
  Table,
  Button,
  TextArea
} from 'semantic-ui-react';

class AddItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };

    this.onAddClick = this.onAddClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onAddClick() {
    if(_.isFunction(this.props.onItemAdd)){
      this.props.onItemAdd(_.trim(this.state.content));
      this.setState({content: ""});
    }
  }

  onInputChange(event, { value }) {
    this.setState({
      content: value,
    })
  }

  render() {
    let isInputValid = _.trim(this.state.content).length > 0;

    return(
      <Table.Row positive  >
        <Table.Cell textAlign="center" >
          <TextArea 
            autoHeight
            value={this.state.content}
            onChange={this.onInputChange}
            style={{width:"100%"}}
          />
        </Table.Cell>
        <Table.Cell textAlign="center" collapsing >
          <Button.Group vertical >
            <Button icon="plus" positive={isInputValid} disabled={!isInputValid} onClick={this.onAddClick} />
          </Button.Group>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default AddItem;
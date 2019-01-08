import React from 'react';
import _ from 'lodash';
import {
  Table,
  TextArea,
  Button,
} from 'semantic-ui-react';

class DateItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      content: this.props.content,
    };

    this.onSaveClick = this.onSaveClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onCheckClick = this.onCheckClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    let stateObj = {};

    if(this.props.content !== prevProps.content){
      stateObj = {
        ...stateObj,
        content: this.props.content,
      }
    }

    if(!_.isEmpty(stateObj)){
      this.setState(stateObj);
    }
  }

  onSaveClick() {
    if(_.isFunction(this.props.onItemSave)){
      this.props.onItemSave(this.props.index, _.trim(this.state.content));
    }
  }

  onCheckClick() {
    if(_.isFunction(this.props.onItemClear)){
      this.props.onItemClear(this.props.index);
    }
  }

  onInputChange(event, { value }) {
    this.setState({
      content: value,
    });
  }

  render() {
    return(
      <Table.Row>
        <Table.Cell textAlign="center" >
          <TextArea 
            autoHeight
            value={this.state.content}
            onChange={this.onInputChange}
            style={{width:"100%"}}
          />
        </Table.Cell>
        <Table.Cell textAlign="center" >
          <Button.Group vertical >
            <Button icon="save" positive disabled={this.props.content === this.state.content} onClick={this.onSaveClick} />
            <Button icon="delete" negative onClick={this.onCheckClick} />
          </Button.Group>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default DateItem;
import React from 'react';
import _ from 'lodash';
import {
  Table,
  Modal,
  Icon,
  Label,
} from 'semantic-ui-react';

import DateItem from './DateItem.js';
import AddItem from './AddItem.js';
import {
  getItemsForDate,
  storeItem,
} from '../utils/storage.js';

class CalCell extends React.Component {

  constructor(props){
    super(props);

    this.state={
      isModalOpen: false,
      modalItems: getItemsForDate(this.props.date) || [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.generateModalItem = this.generateModalItem.bind(this);
    this.getModalFormattedDateString = this.getModalFormattedDateString.bind(this);
    this.onItemAdd = this.onItemAdd.bind(this);
  }

  componentDidUpdate(prevProps) {
    let stateObj = {};

    if(prevProps.date !== this.props.date){
      stateObj = {
        ...stateObj,
        modalItems: getItemsForDate(this.props.date),
      };
    }

    if(!_.isEmpty(stateObj)){
      this.setState(stateObj);
    }
  }

  handleClick(event, data) {
    this.setState({
      isModalOpen: true,
      modalItems: getItemsForDate(this.props.date)
    });
  }

  handleCloseClick() {
    this.setState({
      isModalOpen: false,
    });
  }

  getModalFormattedDateString() {
    let { date } = this.props;

    if(date){
      let dd = date.getDate();
      dd = (dd >= 10)? String(dd) : "0"+dd;
      let mm = date.getMonth()+1;
      mm = (mm >= 10)? String(mm) : "0"+mm;
      let yyyy = String(date.getFullYear());
      return(dd+"/"+mm+"/"+yyyy);
    }
    else{
      return "Someday~!";
    }
  }

  generateHolidayLabel() {
    if(this.props.holiday){
      return(
        <Label
          content="Holiday"
          detail={this.props.holiday.name}
          size="large"
          color="green"
          icon="heart"
        />
      );
    }
    else if(this.props.nextHoliday){
      return(
        <Label
          content="Next Holiday"
          detail={this.props.nextHoliday.name + " ("+this.props.nextHoliday.date+"/"+this.props.nextHoliday.month+")"}
          size="large"
          color="blue"
          icon="heart outline"
        />
      );
    }
    else{
      return(
        <Label
          content="No Upcoming Holidays This Month"
          size="large"
        />
      );
    }
  }

  onItemAdd(content) {
    storeItem(this.props.date,content);
    this.setState({
      modalItems: [...this.state.modalItems, content],
    });
  }

  generateModalItem(data, index) {
    return(
      <DateItem
        key={"DI_"+index}
        content={this.state.modalItems[index]}
      />
    );
  }

  render() {

    return(
      <Modal
        trigger={
          <Table.Cell
            style={{marginTop:"0.5em", cursor:(this.props.date)? "pointer" : null}}
            onClick={(this.props.date)? this.handleClick : null}
            active={!_.isEmpty(this.props.holiday) || !_.isEmpty(this.state.modalItems)}
            >
            {(this.props.date)? this.props.date.getDate() : null}
          </Table.Cell>
        }
        closeIcon={<Icon name="close" onClick={this.handleCloseClick} />}
        open={this.state.isModalOpen}
        closeOnDimmerClick
        >
        <Modal.Header content={this.getModalFormattedDateString()} />
        <Modal.Content>
          {this.generateHolidayLabel()}
        </Modal.Content>
        <Table unstackable >
          <Table.Body>
            {
              _.map(this.state.modalItems,this.generateModalItem)
            }
            <AddItem 
              onItemAdd={this.onItemAdd} 
            />
          </Table.Body>
        </Table>
      </Modal>
    );
  }
}

export default CalCell;
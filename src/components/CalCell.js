import React from 'react';
import _ from 'lodash';
import {
  Table,
  Modal,
  Icon,
  Label,
} from 'semantic-ui-react';

class CalCell extends React.Component {

  constructor(props){
    super(props);

    this.state={
      isModalOpen: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.getModalFormattedDateString = this.getModalFormattedDateString.bind(this);
  }

  handleClick(event, data) {
    this.setState({
      isModalOpen: true,
    })
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
          detail={this.props.nextHoliday.name}
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

  render() {

    return(
      <Modal
        trigger={
          <Table.Cell
            style={{marginTop:"0.5em", cursor:(this.props.date)? "pointer" : null}}
            onClick={(this.props.date)? this.handleClick : null}
            active={!_.isEmpty(this.props.holiday)}
            >
            {(this.props.date)? this.props.date.getDate() : null}
          </Table.Cell>
        }
        closeIcon={<Icon name="close" onClick={this.handleCloseClick} />}
        open={this.state.isModalOpen}
        >
        <Modal.Header content={this.getModalFormattedDateString()} />
        <Modal.Content>
          {this.generateHolidayLabel()}
        </Modal.Content>
      </Modal>
    );
  }
}

export default CalCell;
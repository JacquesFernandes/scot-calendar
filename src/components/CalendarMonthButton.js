import React from 'react';
import _ from 'lodash';
import {
  Modal,
  Button,
  Grid,
  Icon,
} from 'semantic-ui-react';

const MONTH_LIST = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December" 
];

class CalendarMonthButton extends React.Component {

  constructor(props) {
    super(props);

    let { currentMonth } = this.props;

    this.state ={
      currentMonth: MONTH_LIST[ (_.isNumber(currentMonth) && currentMonth >= 0 && currentMonth <= 11)? currentMonth : 0 ],
      isModalOpen: false,
    };

    this.handleMonthClick = this.handleMonthClick.bind(this);
    this.setModalState = this.setModalOpenState.bind(this);
  }

  setModalOpenState(isOpen=true) {
    this.setState({
      isModalOpen: isOpen,
    });
  }

  handleMonthClick(month, index) {
    this.setState({
      currentMonth: month,
    }, () => {
      this.setModalOpenState(false);
      if(_.isFunction(this.props.onMonthUpdate)){
        this.props.onMonthUpdate(index);
      }
    });
  }

  render() {
    return(
      <Modal
        trigger={
          <Button
            content={this.state.currentMonth}
            size="large"
            onClick={() => this.setModalOpenState(true)}
          />
        }
        open={this.state.isModalOpen}
        closeOnDimmerClick
        closeIcon={<Icon name="close" onClick={() => this.setModalOpenState(false)} />}
        >
        <Modal.Header content="Pick a Month" />
        
        <Modal.Content >
          <Grid
            stackable
            columns={3}
            >
            <Grid.Row >
              {
                _.map(MONTH_LIST, (month, index) => <Grid.Column style={{marginTop:"0.5em"}} key={"month_"+index} >
                    <Button fluid content={month} disabled={this.state.currentMonth === month} onClick={() => this.handleMonthClick(month, index)} />
                  </Grid.Column>)
              }
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>
    );
  }
}

export default CalendarMonthButton;
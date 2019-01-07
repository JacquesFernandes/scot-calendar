import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import {
  Grid
} from 'semantic-ui-react';

import CalendarMonthButton from '../components/CalendarMonthButton.js';
import CalendarMonth from '../components/CalendarMonth.js';

class Calendar extends React.Component {

  constructor(props){
    super(props);
    
    this.state = {
      currentMonthNumber: (new Date()).getMonth(),
      holidays: [],
    };

    this.handleMonthUpdate = this.handleMonthUpdate.bind(this);
  }

  componentDidMount() {
    axios.get("https://www.gov.uk/bank-holidays.json")
    .then(({ data }) => {
      let scottishHolidays = data.scotland.events;
      let holidays = _.map(scottishHolidays, (holiday) => {
        let holiDate = new Date(holiday.date);
        return({
          name: holiday.title,
          month: holiDate.getMonth(),
          date: holiDate.getDate(),
        });
      });

      this.setState({
        holidays,
      });
    })
    .catch((err) => {
      console.error("ERROR:", err);
    })
  }

  handleMonthUpdate(newMonth) {
    if(_.isNumber(newMonth) && newMonth >= 0 && newMonth <= 11){
      this.setState({
        currentMonthNumber: newMonth
      });
    }
  }

  render() {
    return(
      <div>
        <Grid>
          <Grid.Row columns={1} centered >
            <CalendarMonthButton currentMonth={this.state.currentMonthNumber} onMonthUpdate={this.handleMonthUpdate} />
          </Grid.Row>
          <Grid.Row columns={1} centered >
            <Grid.Column>
              <CalendarMonth currentMonth={this.state.currentMonthNumber} holidays={this.state.holidays} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Calendar;
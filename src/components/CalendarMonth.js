import React from 'react';
import _ from 'lodash';
import {
  Table
} from 'semantic-ui-react';

import CalCell from './CalCell.js';

class CalendarMonth extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentMonth: this.props.currentMonth,
      weeks: this.generateCalendarWeeks(this.props.currentMonth),
    };

    this.generateCalendarWeeks = this.generateCalendarWeeks.bind(this);
    this.generateWeekRow = this.generateWeekRow.bind(this);
  }

  componentDidUpdate(){
    let stateObj = {};

    if(this.state.currentMonth !== this.props.currentMonth){
      stateObj = {
        ...stateObj,
        currentMonth: this.props.currentMonth,
        weeks: this.generateCalendarWeeks(this.props.currentMonth),
      };
    }

    if(!_.isEmpty(stateObj)){
      this.setState(stateObj);
    }
  }

  generateCalendarWeeks(month=this.state.currentMonth) {
    let date = new Date();
    date.setMonth(month, 1); // set date object to point to the first date of the month

    let dateList = [];
    while(date.getMonth() === this.props.currentMonth){
      dateList.push(new Date(date));
      date.setDate(date.getDate() +1);
    }

    let weeks = [];
    let weekCounter = 0;
    _.forEach(dateList, (date) => { // create and add lists of the weeks for this month
      if(_.isArray(weeks[weekCounter])){
        weeks[weekCounter].push(date);
      }
      else{
        weeks[weekCounter] = [date];
      }

      if(date.getDay() === 6){
        weekCounter++;
      }
    });
    
    while(weeks[0].length < 7){ // pad first week with nulls, if needed
      weeks[0].unshift(null);
    }

    while(weeks[weeks.length-1].length < 7){ // pad last week with nulls, if needed
      weeks[weeks.length-1].push(null);
    }

    return(weeks);
  }

  generateWeekRow(week, weekIndex) {
    let holidays = this.props.holidays;
    
    function getNextHoliday(date) {
      let nextHoliday = null;

      _.forEach(holidays, (holiday) => {
        if(holiday.date > date.getDate() && nextHoliday === null){
          nextHoliday = holiday;
        }
      });

      return(nextHoliday);
    }

    return(
      <Table.Row key={"week_"+weekIndex}>
        {
          _.map(week, (date, index) => {
            if(date){
              return(
                <CalCell holiday={_.find(holidays, {date: date.getDate()})} nextHoliday={getNextHoliday(date)} date={date} key={"date_"+index} />
              );
            }
            else{
              return(
                <CalCell date={null} key={"date_"+index} />
              );
            }
          })
        }
      </Table.Row>
    );
  }

  render() {
    return(
      <Table celled unstackable textAlign="center" >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell content="S" />
            <Table.HeaderCell content="M" />
            <Table.HeaderCell content="T" />
            <Table.HeaderCell content="W" />
            <Table.HeaderCell content="T" />
            <Table.HeaderCell content="F" />
            <Table.HeaderCell content="S" />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            _.map(this.state.weeks, this.generateWeekRow)
          }
        </Table.Body>
      </Table>
    );
  }
}

export default CalendarMonth;
import _ from 'lodash';

function generateKeyFromDate(date) {
  let matcher = new RegExp("^[0-9]{1,2}/[0-9]{1,2}$")
  if(_.isDate(date)){
    let d = date.getDate();
    let m = date.getMonth();
    return `${d}/${m}`;
  }
  else if(_.isString(date) && matcher.test(date)){
    return date;
  }
  else{
    return null;
  }
}

function storeItem(date, content) {
  let key = generateKeyFromDate(date);
  if(key){
    let data = getItemsForDate(date);
    if(data && _.isArray(data)){
      data.push(content);
      sessionStorage.setItem(key, JSON.stringify(data));
    }
    else{
      sessionStorage.setItem(key, JSON.stringify([content]));
    }
  }
}

function getItemsForDate(date) {
  let key = generateKeyFromDate(date);
  if(key){
    let data = sessionStorage.getItem(key);
    if(data){
      return JSON.parse(data);
    }
    else{
      return [];
    }
  }
  else{
    return [];
  }
}

function getItemsForMonth(monthIndex) {
  let keys = _.filter(_.keys(sessionStorage), (key) => (_.split(key,"/").pop() === String(monthIndex)));
  return _.map(keys, getItemsForDate);
}

function editItemForDateIndex(date, index, content) {
  let data = getItemsForDate(date);
  data[index] = content;
  sessionStorage.setItem(generateKeyFromDate(date), JSON.stringify(data));
}

export {
  storeItem,
  getItemsForDate,
  getItemsForMonth, 
  editItemForDateIndex,
};
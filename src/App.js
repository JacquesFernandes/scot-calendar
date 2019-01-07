import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import {
  Card,
} from 'semantic-ui-react';

import Calendar from './containers/Calendar.js';
import EditDate from './containers/EditDate.js';
import NotFound from './containers/NotFound.js';

class App extends React.Component {

  render() {
    return(
      <div style={{margin:"0.5em"}} >
        <Card fluid >
          <Card.Content>
            <Card.Header content="CalEdit" />
          </Card.Content>
          <Card.Content>
            <Switch>
              <Route exact path="/" component={Calendar} />
              <Route exact path="/edit" component={EditDate} />
              <Route component={NotFound} />
            </Switch>
          </Card.Content>
        </Card>
      </div>
    );
  }

}

export default App;
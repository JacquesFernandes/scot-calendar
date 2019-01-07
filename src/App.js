import React from 'react';
import {
  Card,
} from 'semantic-ui-react';

class App extends React.Component {
  

  render() {
    return(
      <div style={{margin:"0.5em"}} >
        <Card fluid >
          <Card.Content>
            <Card.Header content="CalEdit" />
          </Card.Content>
          <Card.Content>
            Hi!
          </Card.Content>
        </Card>
      </div>
    );
  }

}

export default App;
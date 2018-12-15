import React, { Component } from 'react';
import {
  Container,
  Grid,
} from 'semantic-ui-react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import StudentTable from './StudentTable';
import AddStudent from './AddStudent';
import Registration from './Registration'
import Title from './Title.js'
import '../assets/css/App.css';

// @inject ('FBStore')
class App extends Component {
  // constructor(props){
  //   super(props);
  // }

  // @observable
  // loginState(){
  //   this.props.FBStore.loginState().onAuthStateChanged(user => {
  //     if (user){
  //       return user.currentUser.user;
  //     } else {
  //       return false;
  //     }
  //   })

  //   return false;
  // }

  @observer
  render() {
    console.log('hello')
    const loggedin = (
      <Container>
        <Title />
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column width={12}>
              <StudentTable />
            </Grid.Column>
            <Grid.Column width={4}>
              <AddStudent />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
    
    return true ? loggedin : <Registration/>
  }
}

export default App;

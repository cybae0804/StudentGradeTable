require('dotenv').config();
import { observable, action, computed } from "mobx";
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

class FBStore {
    constructor () {
        this.loadServerData = this.loadServerData.bind(this);
        this.addStudentToServer = this.addStudentToServer.bind(this);
        this.deleteStudentFromServer = this.deleteStudentFromServer.bind(this);
        this.updateServerData = this.updateServerData.bind(this);

        this.initializeFirebaseDB();

        firebase.auth().onAuthStateChanged(user => {
          if (user) this.user = user;
          else this.user = null;
        }) ;
    }

    @observable
    studentData = {};

    @observable 
    user = null;
  
    initializeFirebaseDB() {
      const fb = firebase.initializeApp({
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_DATABASE_URL,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
      });
  
      this.db = fb.database();
      this.auth = fb.auth();
    }

    //
    // DATABASE
    //
    @action
    loadServerData() {
      const stdref = this.db.ref(`${this.user.uid}/students/`);
      stdref.on('value', snapshot => {
        if (snapshot.val()){
          this.studentData = snapshot.val();
        }
      });
    }
  
    addStudentToServer(name, course, grade) {
      const stdref = this.db.ref(`${this.user.uid}/students/`);
      const key = stdref.push().key;
      stdref.child(key).set({
        course: course,
        name: name,
        grade: grade,
        entry_id: key
      })
    }
  
    deleteStudentFromServer(entry_id){
      const stdref = this.db.ref(`${this.user.uid}/students/`);
      stdref.child(entry_id).remove();
    }
  
    updateServerData(entry_id, name, course, grade) {
      const stdref = this.db.ref(`${this.user.uid}/students/`);
      stdref.child(entry_id).update({
        name: name,
        course: course,
        grade: grade
      });
    }

    //
    // AUTH
    //
    registerUser = (email, password) => {
      this.auth.createUserWithEmailAndPassword(email, password).catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        console.error(`errorCode: ${errorCode}`);
        console.error(`errorMessage: ${errorMessage}`);
      });
    }

    loginUser = (email, password) => {
      this.auth.signInWithEmailAndPassword(email, password).catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error(`errorCode: ${errorCode}`);
        console.error(`errorMessage: ${errorMessage}`);
      });
    }

    signOut = () => {
      this.auth.signOut();
    }
}

export default FBStore;
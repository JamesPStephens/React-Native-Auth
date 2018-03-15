import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentDidMount() {
    firebase.initializeApp({
        apiKey: "AIzaSyABrFc0156YIeZ5D-40ARfxGceqg092yfk",
        authDomain: "react-native-authenticat-76b8e.firebaseapp.com",
        databaseURL: "https://react-native-authenticat-76b8e.firebaseio.com",
        projectId: "react-native-authenticat-76b8e",
        storageBucket: "react-native-authenticat-76b8e.appspot.com",
        messagingSenderId: "986888704988"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
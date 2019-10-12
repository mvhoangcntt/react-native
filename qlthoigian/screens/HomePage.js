import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';

class HomePage extends Component {
  static navigationOptions = {
    title: 'Home page',
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.props.navigation.navigate('ListUser')}>
          <Text style={styles.loginText}>Note</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.props.navigation.navigate('Timetable1')}>
          <Text style={styles.loginText}>Time table</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.props.navigation.goBack()}>
          <Text style={styles.loginText}>Logout</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
export default HomePage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#82FA58',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#00b5ec',
  },
  loginText: {
    color: 'white',
  },
});

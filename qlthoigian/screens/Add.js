import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  TouchableHighlight,
} from 'react-native';

class UpdateTGB1 extends React.Component {
  static navigationOptions = {
    title: 'Add',
  };
  constructor(props) {
    super(props);
    this.state = {
      Status: '',
      Date: '',
    };
  }
  confirm() {
    // fetch('http://192.168.1.102/tool/add.php', {
    fetch('https://hai80184.000webhostapp.com/ki4nam5/add.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.Status,
        password: this.state.Date,
        nd: this.state.nd,
      }),
    }).then(response => {
      if (this.state.Status.length > 0 && this.state.Status.length > 0) {
        if (response.status === 200) {
          if (this.state.nd === 'listus') {
            this.props.navigation.navigate('ListUser');
          }
          if (this.state.nd === 'timetable1') {
            this.props.navigation.navigate('Timetable1');
          }
          if (this.state.nd === 'timetable2') {
            this.props.navigation.navigate('Timetable2');
          }
          Alert.alert('Thêm thành công !');
        } else if (response.status === 301) {
          Alert.alert('Công việc đã tồn tại');
        }
      } else {
        Alert.alert('Không được để trống !');
      }
    });
  }
  componentDidMount() {
    this.setState({
      nd: this.props.navigation.getParam('nd', 'default value'),
    });
  }
  render() {
    var tt = '';
    if (this.state.nd === 'timetable2') {
      tt = 'Thời gian biểu 2';
    }
    if (this.state.nd === 'timetable1') {
      tt = 'Thời gian biểu 1';
    }
    if (this.state.nd === 'listus') {
      tt = 'Công việc';
    }
    return (
      <View style={styles.container}>
        <Text style={styles.ttt}>{tt}</Text>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require('./../job.png')} />
          <TextInput
            style={styles.inputs}
            placeholder="Job"
            value={this.state.Status}
            onChangeText={Status => this.setState({Status})}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require('./../alarm.png')} />
          <TextInput
            style={styles.inputs}
            // secureTextEntry={true}
            value={this.state.Date}
            placeholder="22/02/2019"
            onChangeText={Date => this.setState({Date})}
          />
        </View>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.confirm()}>
          <Text style={styles.loginText}>Confirm</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
export default UpdateTGB1;

const styles = StyleSheet.create({
  ttt: {
    fontSize: 30,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#82FA58',
  },
  inputContainer: {
    borderColor: '#AAAAAA',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
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

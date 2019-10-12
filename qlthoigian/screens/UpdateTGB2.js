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

class UpdateTGB2 extends React.Component {
  static navigationOptions = {
    title: 'Update',
  };
  constructor(props) {
    super(props);
    this.state = {
      Status: '',
      Date: '',
    };
  }
  confirm() {
    // fetch('http://192.168.1.102/tool/updatetgb2.php', {
    fetch('https://hai80184.000webhostapp.com/ki4nam5/updatetgb2.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.Status,
        password: this.state.Date,
        id: this.state.id,
      }),
    }).then(response => {
      if (this.state.Status.length > 0 && this.state.Status.length > 0) {
        if (response.status === 200) {
          this.props.navigation.goBack();
          Alert.alert('Sửa thành công thành công !');
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
      Status: this.props.navigation.getParam('Status', 'default value'),
      Date: this.props.navigation.getParam('Date', 'default value'),
      id: this.props.navigation.getParam('id', 'default value'),
    });
  }
  render() {
    return (
      <View style={styles.container}>
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
export default UpdateTGB2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#82FA58',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
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

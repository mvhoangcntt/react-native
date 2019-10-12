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

class Register extends React.Component {
  static navigationOptions = {
    title: 'Register',
  };
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwords: '',
    };
  }
  login2() {
    // fetch('http://192.168.1.102/tool/login.php', {
    fetch('https://hai80184.000webhostapp.com/ki4nam5/login.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.email,
        password: this.state.password,
      }),
    }).then(response => {
      if (
        this.state.email.length > 0 &&
        this.state.password.length > 0 &&
        this.state.passwords.length > 0
      ) {
        if (this.state.password === this.state.passwords) {
          if (response.status === 200) {
            this.props.navigation.goBack();
            Alert.alert('Đăng ký thành công !');
          } else if (response.status === 301) {
            Alert.alert('User đã tồn tại');
          }
        } else {
          Alert.alert('Mật khẩu không trùng khớp !');
        }
      } else {
        Alert.alert('Không được để trống !');
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require('./../gmail.png')} />
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={email => this.setState({email})}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require('./../key.png')} />
          <TextInput
            style={styles.inputs}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={password => this.setState({password})}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require('./../key.png')} />
          <TextInput
            style={styles.inputs}
            secureTextEntry={true}
            placeholder="Enter the password"
            onChangeText={passwords => this.setState({passwords})}
          />
        </View>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.login2()}>
          <Text style={styles.loginText}>Confirm</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
export default Register;

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

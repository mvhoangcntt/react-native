import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  TouchableHighlight,
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import HomePage from './screens/HomePage';
import Register from './screens/Register';
import ListUser from './screens/ListUser';
import Timetable1 from './screens/Timetable1';
import Timetable2 from './screens/Timetable2';
import UpdateTT from './screens/UpdateTT';
import UpdateTGB1 from './screens/UpdateTGB1';
import UpdateTGB2 from './screens/UpdateTGB2';
import Add from './screens/Add';
import CustomDrawer from './screens/DrawerNavigator/CustomDrawer';
import { from } from 'rxjs';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  login() {
    // fetch('http://192.168.1.102/tool/loginkt.php', {
    fetch('https://hai80184.000webhostapp.com/ki4nam5/loginkt.php', {
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
      if (response.status === 200) {
        Alert.alert('Tài khoản hoặc mật khẩu sai !');
      } else if (response.status === 301) {
        this.props.navigation.navigate('HomePage');
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require('./gmail.png')} />
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            onChangeText={email => this.setState({email})}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require('./key.png')} />
          <TextInput
            style={styles.inputs}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={password => this.setState({password})}
          />
        </View>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.login()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>
        <View>
          <Text onPress={() => this.props.navigation.navigate('Register')}>
            Register
          </Text>
        </View>
      </View>
    );
  }
}

const AppStack = createDrawerNavigator({
  HomePage: HomePage,
  'Ghi chú': ListUser,
  'Việc cần làm': Timetable1,
},
{
  drawerType: 'slide',
  contentComponent: CustomDrawer,
},
);
const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Register: Register,
    HomePage: AppStack,
    ListUser: ListUser,
    Timetable1: Timetable1,
    Timetable2: Timetable2,
    UpdateTT: UpdateTT,
    UpdateTGB1: UpdateTGB1,
    UpdateTGB2: UpdateTGB2,
    Add: Add,
  },
  {
    initialRouteName: 'Home',
  },
);
export default createAppContainer(AppNavigator);

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

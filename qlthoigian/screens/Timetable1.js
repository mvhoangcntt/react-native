import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Type_two from './Timetable2';

class Timetable1 extends Component {
  static navigationOptions = {
    title: 'Thời gian biểu 1',
  };
  constructor() {
    super();
    this.state = {
      responseData: [],
    };
  }
  UNSAFE_componentWillMount = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append('pragma', 'no-cache');
      myHeaders.append('cache-control', 'no-cache');

      var myInit = {
        method: 'GET',
        headers: myHeaders,
      };
      fetch(
        // 'http://192.168.1.102/tool/listthoigianbieu.php',
        'https://hai80184.000webhostapp.com/ki4nam5/listthoigianbieu.php', myInit
      ).then(response => response.json())
      .then(responseJson => {
        this.setState({responseData: responseJson});
      })
    } catch (err) {
      Alert.alert('Lỗi');
    }
  };
  reloadDB = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append('pragma', 'no-cache');
      myHeaders.append('cache-control', 'no-cache');

      var myInit = {
        method: 'GET',
        headers: myHeaders,
      };
      fetch(
        // 'http://192.168.1.102/tool/listthoigianbieu.php',
        'https://hai80184.000webhostapp.com/ki4nam5/listthoigianbieu.php', myInit
      ).then(response => response.json())
      .then(responseJson => {
        this.setState({responseData: responseJson});
      })
    } catch (err) {
      Alert.alert('Lỗi');
    }
  };
  deleteItem(itemID) {
    // fetch('http://192.168.1.102/tool/deletetgb1.php', {
    fetch('https://hai80184.000webhostapp.com/ki4nam5/deletetgb1.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: itemID,
      }),
    });
    this.reloadDB();
    // this.props.navigation.push('Timetable1');
    Alert.alert('Xóa thành công !');
  }
  render() {
    // var i = 0;
    return (
      <View style={styles.container}>
        <FlatList
          refreshing={false}
          onRefresh={() => this.reloadDB()}
          numColumns={1}
          data={this.state.responseData}
          renderItem={({item}) => (
            <TouchableHighlight
              style={styles.container}
              onLongPress={() =>
                Alert.alert(
                  'Bạn muốn !',
                  'Làm gì !',
                  [
                    {
                      text: 'Delete',
                      onPress: () => this.deleteItem(item.id),
                      // onPress: () => console.log('Ask me later pressed'),
                    },
                    {
                      text: 'Update',
                      onPress: () =>
                        this.props.navigation.navigate('UpdateTGB1', {
                          Status: item.Status,
                          Date: item.Date,
                          id: item.id,
                        }),

                      // onPress: () => console.log('Cancel Pressed'),
                      // style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  {cancelable: false},
                )
              }>
              <View style={styles.post}>
                <View style={styles.postNumber}>
                  <Text>{item.id}</Text>
                </View>
                <View style={styles.postContent}>
                  <Text>{item.Status}</Text>
                  <Text style={styles.postBody}>{item.Date}</Text>
                </View>
              </View>
            </TouchableHighlight>
          )}
        />
        <TouchableWithoutFeedback
          onLongPress={() =>
            Alert.alert(
              'Bạn muốn !',
              'Làm gì !',
              [
                {
                  text: 'Come home',
                  onPress: () => this.props.navigation.navigate('HomePage'),
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            )
          }
          onPress={() =>
            this.props.navigation.navigate('Add', {nd: 'timetable1'})
          }>
          <View style={styles.fab}>
            <Text style={styles.text2}>+</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
const TabNavigator = createMaterialTopTabNavigator(
  {
    Type_one: Timetable1,
    Type_two: Type_two,
  },
  {
    initialRouteName: 'Type_one',
  },
);

export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  text2: {
    fontSize: 50,
    paddingBottom: 5,
  },
  fab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 60,
    height: 60,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: '#c93838',
    borderRadius: 30,
    position: 'absolute',
    bottom: 10,
    right: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  container: {
    flex: 1,
  },
  post: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
  },
  postNumber: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEE',
  },
  postContent: {
    flex: 1,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingVertical: 25, // :D
    paddingRight: 15,
    backgroundColor: '#DDD',
  },
  postBody: {
    marginTop: 5, // :D
    fontSize: 12,
    color: 'red',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    padding: 15,
    backgroundColor: 'blue',
  },
  delete: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  xoa: {
    textAlign: 'right',
    paddingRight: 25,
  },
});

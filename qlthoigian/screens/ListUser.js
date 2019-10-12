import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';

export default class ListUser extends Component {
  static navigationOptions = {
    title: 'Note',
  };
  constructor() {
    super();
    this.state = {
      responseData: [],
    };
  }
  UNSAFE_componentWillMount() {
    try {
      var myHeaders = new Headers();
      myHeaders.append('pragma', 'no-cache');
      myHeaders.append('cache-control', 'no-cache');

      var myInit = {
        method: 'GET',
        headers: myHeaders,
      };
      fetch(
        'https://hai80184.000webhostapp.com/ki4nam5/listnote.php', myInit
      ).then(response => response.json())
      .then(responseJson => {
        this.setState({responseData: responseJson});
      })
    } catch (err) {
      Alert.alert('Lỗi');
    }
  };
  reloadDB() {
    try {
      var myHeaders = new Headers();
      myHeaders.append('pragma', 'no-cache');
      myHeaders.append('cache-control', 'no-cache');

      var myInit = {
        method: 'GET',
        headers: myHeaders,
      };
      // const response = await fetch('http://192.168.1.102/tool/listnote.php');
      fetch(
        'https://hai80184.000webhostapp.com/ki4nam5/listnote.php', myInit
      ).then(response => response.json())
      .then(responseJson => {
        this.setState({responseData: responseJson});
      })
    } catch (err) {
      alert(err);
    }
  };
  deleteItem(itemID) {
    // fetch('http://192.168.1.102/tool/delete.php', {
    fetch('https://hai80184.000webhostapp.com/ki4nam5/delete.php', {
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
    Alert.alert('Xóa thành công !');
  }
  render() {
    // var i = 1;
    return (
      <View style={styles.container}>
        <SwipeListView
          refreshing={false}
          onRefresh={() => this.reloadDB()}
          data={this.state.responseData}
          renderItem={({item}) => (
            <View style={styles.post}>
              <View style={styles.postNumber}>
                <Text>{item.id}</Text>
              </View>
              <View style={styles.postContent}>
                <Text>{item.Status}</Text>
                <Text style={styles.postBody}>{item.Date}</Text>
              </View>
            </View>
          )}
          renderHiddenItem={({item}) => (
            <TouchableNativeFeedback>
              <View style={styles.delete}>
                <Text
                  onPress={() => this.deleteItem(item.id)}
                  style={styles.xoa}>
                  Xóa
                </Text>
                <Text
                  onPress={() =>
                    this.props.navigation.navigate('UpdateTT', {
                      Status: item.Status,
                      Date: item.Date,
                      id: item.id,
                    })
                  }
                  style={styles.xoa}>
                  Sửa
                </Text>
              </View>
            </TouchableNativeFeedback>
          )}
          leftOpenValue={0}
          rightOpenValue={-105}
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
          onPress={() => this.props.navigation.navigate('Add', {nd: 'listus'})}>
          <View style={styles.fab}>
            <Text style={styles.text2}>+</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

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
    padding: 10, // :D
    backgroundColor: '#fff',
  },
  postNumber: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  },
  postContent: {
    flex: 1,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingVertical: 25, // :D
    paddingRight: 15,
    backgroundColor: '#DDDDDD',
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

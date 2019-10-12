import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';

export default class customDrawer extends Component {
  constructor() {
    super();
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
        <View>
          <Text style={{padding: 8, color: '#5f6368', fontWeight: '700'}}>
            Chọn chức năng
          </Text>
          <TouchableWithoutFeedback onPress={() => navigate('Ghi chú')}>
            <View
              style={[
                styles.menuItem,
                this.props.activeItemKey == 'Ghi chú' ? styles.active : null,
              ]}>
              <Text style={{marginLeft: 18, fontWeight: '700'}}>Ghi chú</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => navigate('Việc cần làm')}>
            <View
              style={[
                styles.menuItem,
                this.props.activeItemKey == 'Việc cần làm'
                  ? styles.active
                  : null,
              ]}>
              <Text style={{marginLeft: 18, fontWeight: '700'}}>
                Việc cần làm
              </Text>
            </View>
          </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuItem: {
    padding: 16,
    color: '#202124',
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  active: {
    backgroundColor: '#feefc3',
    color: '#202124',
  },
  icon: {
    fontWeight: 'bold',
    color: '#5f6368',
  },
});

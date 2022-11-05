import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import Modal from "react-native-modal";
import moment from 'moment';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      isModalVisible: false,
      selectedDayColor: null,
      customDateStyle: []
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.setIsModalVisible = this.setIsModalVisible.bind(this);
    this.setSelectedDayColor = this.setSelectedDayColor.bind(this);
  }

  // -- for later
  // var flow = {
  //   '#ffe6ff': 'spotting',
  //   '#ff3333': 'light',
  //   '#800000': 'heavy'
  // };

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
      isModalVisible: !this.state.isModalVisible
    });
  }

   setIsModalVisible() {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
  }

  setSelectedDayColor(color) {
    moment.locale('en-US');
    let date = moment(this.state.selectedStartDate).format("L");
    let historyArray = this.state.customDateStyle;

    const isFound = historyArray.some(element => {
      if (element.date === date) {
        element.style = {backgroundColor: color}
        return true;
      }
      return false;
    });

    if (!isFound) {
      historyArray.push({
        date: date,
        style: {backgroundColor: color}
      });
    }

    this.setState({customDateStyle: historyArray, selectedDayColor: color})
  }

  render() {
    const { selectedStartDate, isModalVisible, selectedDayColor, customDateStyle } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <View style={styles.container}>
        <CalendarPicker
          onDateChange={this.onDateChange}
          selectedDayColor={selectedDayColor}
          customDatesStyles={customDateStyle}
        />

        <View>
          <Text>SELECTED DATE:{ startDate }</Text>
          <Text>SELECTED Color:{ selectedDayColor }</Text>

        </View>

        <Modal isVisible={isModalVisible}>
          <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <Text>Flow</Text>
            <Button color='#ffe6ff' onPress = {() => this.setIsModalVisible() + this.setSelectedDayColor('#ffe6ff') } />
            <Button color='#ff3333' onPress = {() => this.setIsModalVisible() + this.setSelectedDayColor('#ff3333') }  />
            <Button color='#800000' onPress = {() => this.setIsModalVisible() + this.setSelectedDayColor('#800000') }  />
          </View>
       </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
  },
  Button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
});
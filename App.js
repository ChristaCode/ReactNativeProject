import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import Modal from "react-native-modal";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      isModalVisible: false,
      selectedDayColor: '#7300e6',
      customDateStyle: []
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.setIsModalVisible = this.setIsModalVisible.bind(this);
    this.setSelectedDayColor = this.setSelectedDayColor.bind(this);
  }

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
    let date = this.state.customDateStyle;
    date.push({
      date: this.state.selectedStartDate,
      style: {backgroundColor: color}
    });
    this.setState({customDateStyle: date, selectedDayColor: color})
  }

  render() {
    const { selectedStartDate, isModalVisible, selectedDayColor, customDateStyle } = this.state;
    console.log(selectedDayColor)
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
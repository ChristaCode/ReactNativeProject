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
import RNFS from 'react-native-fs';

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

  componentDidMount() {
    console.log('we running?');
        RNFS.readDir(RNFS.DocumentDirectoryPath)
        .then((result) => {
        console.log('GOT RESULT', result);
        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      })
      .then((statResult) => {
        if (statResult[0].isFile()) {

        return RNFS.readFile(statResult[1], 'utf8');
      }
      return 'no file';
      })
      .then((contents) => {
      console.log('contents', contents);
        var object = JSON.parse(contents);
        var array = [];
        for(var i in object) {
          array.push(object[i]);
        }

        console.log('array', array);
        this.setState({
            customDateStyle: array
        })
      })
      .catch((err) => {
        console.log(err.message, err.code);
      });
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

     var path = RNFS.DocumentDirectoryPath + '/test.txt';
     RNFS.writeFile(path, JSON.stringify(historyArray), 'utf8')
       .then((success) => {
         console.log('FILE WRITTEN!', path);
       })
       .catch((err) => {
         console.log(err.message);
       });
//     console.log(JSON.stringify(historyArray));
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
          selectedDayStyle={viewstyle(selectedDayColor)}
        />

        <View>
          <Text>SELECTED DATE:{ startDate }</Text>
          <Text>SELECTED Color:{ selectedDayColor }</Text>

        </View>

        <Modal isVisible={isModalVisible}>
          <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <Text>Flow</Text>
            <Button title="one" color='#ffe6ff' onPress = {() => this.setIsModalVisible() + this.setSelectedDayColor('#ffe6ff') } />
            <Button title="two" color='#ff3333' onPress = {() => this.setIsModalVisible() + this.setSelectedDayColor('#ff3333') }  />
            <Button title="three" color='#800000' onPress = {() => this.setIsModalVisible() + this.setSelectedDayColor('#800000') }  />
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

const viewstyle = (selectedDayColor) => StyleSheet.flatten([
  {
    backgroundColor: selectedDayColor
  }
]);
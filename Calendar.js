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
import { withNavigation } from 'react-navigation';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      customDateStyle: []
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  componentDidMount() {
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
      selectedStartDate: date
    });
    this.props.navigation.navigate('ColorPicker', {date: date, historyArray: this.state.customDateStyle});
  }

  render() {
    const { customDateStyle } = this.state;
    return (
      <View style={styles.container}>
        <CalendarPicker
          onDateChange={this.onDateChange}
          selectedDayColor={this.props.color}
          customDatesStyles={customDateStyle}
          selectedDayStyle={viewstyle(this.props.color)}
        />
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

export default withNavigation(Calendar);
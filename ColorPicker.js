import * as React from 'react';
import { View, Text, Button } from 'react-native';
import RNFS from 'react-native-fs';
import moment from 'moment';

function setTodaysFlow(color, date, historyArray, navigation){
    moment.locale('en-US');
    let dt = moment(date).format("L");

    const isFound = historyArray.some(element => {
      if (element.date === dt) {
        element.style = {backgroundColor: color}
        return true;
      }
      return false;
    });
    if (!isFound) {
      historyArray.push({
        date: dt,
        style: {backgroundColor: color}
      });
    }

     var path = RNFS.DocumentDirectoryPath + '/test.txt';
     RNFS.writeFile(path, JSON.stringify(historyArray), 'utf8')
       .then((success) => {
         console.log('FILE WRITTEN!', path);
       })
       .catch((err) => {
         console.log(err.message);
       });

    navigation.navigate('Calendar', {color: color})
}

function ColorPicker({route, navigation}) {
  const { date, historyArray } = route.params;
  let color;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Button title="one" color='#ffe6ff' onPress = {() => setTodaysFlow('#ffe6ff', date, historyArray, navigation) } />
    <Button title="two" color='#ff3333' onPress = {() => setTodaysFlow('#ff3333', date, historyArray, navigation) }  />
    <Button title="three" color='#800000' onPress = {() => setTodaysFlow('#800000', date, historyArray, navigation) }  />
    </View>
  );
}

export default ColorPicker;
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RNFS from 'react-native-fs';
import moment from 'moment';

import Calendar from './Calendar';
import ColorPicker from './ColorPicker';

function setTodaysFlow(color, date){
     var path = RNFS.DocumentDirectoryPath + '/test.txt';
     var historyArray = [];
      historyArray.push({
            date: date,
            style: {backgroundColor: color}
          });
     RNFS.writeFile(path, JSON.stringify(historyArray), 'utf8')
       .then((success) => {
         console.log('FILE WRITTEN!', path);
       })
       .catch((err) => {
         console.log(err.message);
       });
}

function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Text>How is your period today?</Text>
        <Button title="one" color='#ffe6ff' onPress = {() => setTodaysFlow('#ffe6ff', moment().format("L")) } />
        <Button title="two" color='#ff3333' onPress = {() => setTodaysFlow('#ff3333', moment().format("L")) }  />
        <Button title="three" color='#800000' onPress = {() => setTodaysFlow('#800000', moment().format("L")) }  />
        <Button
          title="Go to Calendar"
          onPress={() => navigation.navigate('Calendar')}
        />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="ColorPicker" component={ColorPicker} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
'use strict';

import React, { View,Text, Component,AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import configureStore from './configureStore';

const store = configureStore();




const App = (text) => (
   <View>
      <Text>{text}</Text>
   </View>
)

class ReduxCounterUniversal extends Component {
  render() {
    return (
      <Provider store={store}>
        <App text='aaa'/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('hello', () => ReduxCounterUniversal);
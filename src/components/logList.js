import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';

import { fetchData, saveData, removeItem } from '../storage/database';
import { ListItem } from 'react-native-elements';
import styles from '.././styles/styles';
import AsyncStorage from "@react-native-community/async-storage";

class LogList extends Component {
  constructor(){
    super()
    this.state=({
      DATA: [],
    })
  } 
  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    let DATA = await fetchData();
    this.setState({DATA});
    console.log('test');
  };

  validateRemoveItem = (item) => {
    Alert.alert(
      'Logout' ,
      `Confirm to Logout ${item.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK', 
          onPress: () => {removeItem(item); this.getData()}
        },
      ],
      {cancelable: false},
    )
  };
  
  render() {
    // this.getData();
    return (
      // this.getData(),
      <View style={styles.logListContainer}>
        <Text>List of People who Logged In</Text>
        <FlatList
          data={this.state.DATA}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => this.validateRemoveItem(item)}
              // onPress={() => console.log()}
            >
              <ListItem
                roundAvatar
                title={`${item.name}`}
                subtitle={`${item.person}: ${item.purpose}`}
                leftAvatar= {{
                  source: require('.././images/sprobe_logo.png'),
                }}
                containerStyle={styles.listTouchable}
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.name}
          ListEmptyComponent = {() => 
            <Text>
              There are no Logged Visitor yet.
            </Text>
          }
          // ListHeaderComponent={() => item.length > 0 && <TableHeader />}
        />
      </View>
    )
  }
}

export default LogList;
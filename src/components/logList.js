import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  RefreshControl,
} from 'react-native';

import { fetchData, saveData, removeItem } from '../storage/database';
import { ListItem } from 'react-native-elements';
import styles from '.././styles/styles';
import AsyncStorage from "@react-native-community/async-storage";

const validateRemoveItem = (item) => {
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
        onPress: () => {removeItem(item)}
      },
    ],
    {cancelable: false},
  )
};

export default LogList = ({ data }) => {
  return (
    <View style={styles.logListContainer}>
      <Text>List of People who Logged In{console.log(data)}</Text>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => validateRemoveItem(item)}
          >
            <ListItem
              roundAvatar
              style
              title={`${item.name}`}
              subtitle={`${item.person}: ${item.purpose}`}
              leftAvatar= {{
                source: require('.././images/sprobe_logo.png'),
              }}
              titleStyle={styles.titleList}
              subtitleStyle={styles.titleList}
              containerStyle={styles.listTouchable}

            />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.name}
        refreshing={true}
        // onRefresh={true}
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

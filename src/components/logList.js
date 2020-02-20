import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';

import {ListItem} from 'react-native-elements';
import styles from '.././styles/styles';

const LogList = props => {
  return (
    <View style={styles.logListContainer}>
      <Text>List of People who Logged In</Text>
      <FlatList
        data={props.data}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => props.validateLogOut(item)}>
            <ListItem
              roundAvatar
              style
              title={`${item.inputName}`}
              subtitle={`${item.inputPerson}: ${item.inputPurpose}`}
              leftAvatar={{
                source: require('.././images/sprobe_logo.png'),
              }}
              titleStyle={styles.titleList}
              subtitleStyle={styles.titleList}
              containerStyle={styles.listTouchable}
            />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        refreshing={true}
        // onRefresh={true}
        ListEmptyComponent={() => <Text>There are no Visitor yet.</Text>}
      />
    </View>
  );
};

const renderItem = ({item}) => {
  if (item.timeOut === null) {
    console.log(item);
  }
};

export default LogList;

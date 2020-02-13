import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import { fetchData } from '../storage/database';
import { ListItem } from 'react-native-elements';
import styles from '.././styles/styles';

class LogList extends Component {
  constructor(){
    super()

    this.state = {
      DATA: [],
    };
  }

  componentDidMount(){
    this.getData();
  }

  getData = async () => {
    let DATA = await fetchData();
    this.setState({DATA});
  };

  pressHandler = (item) => {
    console.log(item);
  };

  render() {
    return (
      <View style={styles.logListContainer}>
        <Text>List of People who Logged In</Text>
        <FlatList
          data={this.state.DATA}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => this.pressHandler(item)}>
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
          keyExtractor={item => item.date}
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
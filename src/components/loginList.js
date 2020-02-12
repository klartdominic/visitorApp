import {
  View,
  Text,
} from 'react-native';

export default personList = ({data}) => {
  const logData = getAllData(data);

  return (
    <View>
      <Text>
        List of People who Logged In
      </Text>
      <Tableheader />
      {
        logData.map((log, index) =>
          <Row logged={log} index={index} key={index} />
        )
      }
    </View>
  );
}

const getAllData = (datas) =>
  datas
    .sort((first,second) => second.date - first.date)
    .slice(0,10);
    //.sort((first,second) => second.name )